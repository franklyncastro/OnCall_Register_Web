import { useState, useEffect } from "react";
import { Table, Spinner, Form, Stack, Container, Card } from "react-bootstrap";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";  // ✅ reemplaza Swal
import styles from "./UsuariosCard.module.css";

function UsuariosCard({ refrescarNombres }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("");

  const obtenerUsuarios = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "departamentos"));
    const data = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setUsuarios(data);
    setLoading(false);
  };

  useEffect(() => { obtenerUsuarios(); }, []);

  // ✅ Reemplaza el Swal de eliminar
  const eliminarUsuario = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ marginBottom: 8, fontWeight: 600 }}>¿Eliminar este usuario?</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={async () => {
                closeToast();
                await deleteDoc(doc(db, "departamentos", id));
                setUsuarios((prev) => prev.filter((u) => u.id !== id));
                refrescarNombres?.();
                toast.success("Usuario eliminado");
              }}
              style={{ background: "#e24b4a", color: "white", border: "none", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 12 }}
            >
              Eliminar
            </button>
            <button
              onClick={closeToast}
              style={{ background: "transparent", border: "0.5px solid #9ca3af", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 12, color: "inherit" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeButton: false }
    );
  };

  const editarUsuario = (u) => {
    setEditandoId(u.id);
    setNuevoNombre(u.nombre);
    setNuevoTipo(u.tipo);
  };

  const guardarEdicion = async (id) => {
  if (!nuevoNombre || !nuevoTipo) {
    toast.error("Completa todos los campos");
    return;
  }
  await updateDoc(doc(db, "departamentos", id), {
    nombre: nuevoNombre,
    tipo: nuevoTipo.toLowerCase(), // ✅ punto 5 — siempre minúscula
  });
  setUsuarios((prev) =>
    prev.map((u) => u.id === id ? { ...u, nombre: nuevoNombre, tipo: nuevoTipo.toLowerCase() } : u)
  );
  setEditandoId(null);
  refrescarNombres?.();
  toast.success("Usuario actualizado");
};

  const getInitials = (nombre) => nombre?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  if (loading) return <div className={styles.loading}><Spinner animation="border" /></div>;

  return (
    <Container fluid className="py-4 d-flex justify-content-center">
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          <i className="fa-solid fa-users me-2"></i>Usuarios Registrados
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className={styles.table} style={{ marginBottom: 0 }}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Departamento</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>
                      {editandoId === u.id ? (
                        <Form.Control size="sm" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                      ) : (
                        <div className={styles.nameCell}>
                          <span className={styles.avatar}>{getInitials(u.nombre)}</span>
                          {u.nombre}
                        </div>
                      )}
                    </td>
                    <td>
                      {editandoId === u.id ? (
                        <Form.Select size="sm" value={nuevoTipo} onChange={(e) => setNuevoTipo(e.target.value)}>
                          <option value="">Selecciona</option>
                          <option value="switch">Switch</option>
                          <option value="core">Core</option>
                        </Form.Select>
                      ) : (
                        <span className={`${styles.deptBadge} ${u.tipo === "switch" || u.tipo === "Switch" ? styles.deptSwitch : styles.deptCore}`}>
                          {u.tipo}
                        </span>
                      )}
                    </td>
                    <td className="text-center">
                      {editandoId === u.id ? (
                        <Stack direction="horizontal" gap={2} className="justify-content-center">
                          <button className={`${styles.actionBtn} ${styles.btnEdit}`} onClick={() => guardarEdicion(u.id)}>Guardar</button>
                          <button className={`${styles.actionBtn} ${styles.btnDelete}`} onClick={() => setEditandoId(null)}>Cancelar</button>
                        </Stack>
                      ) : (
                        <Stack direction="horizontal" gap={2} className="justify-content-center">
                          <button className={`${styles.actionBtn} ${styles.btnEdit}`} onClick={() => editarUsuario(u)}>Editar</button>
                          <button className={`${styles.actionBtn} ${styles.btnDelete}`} onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
                        </Stack>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UsuariosCard;