import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Spinner,
  Form,
  Stack,
  Container,
  Card,
} from "react-bootstrap";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import Swal from "sweetalert2";
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
    const data = querySnapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    setUsuarios(data);
    setLoading(false);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const eliminarUsuario = (id) => {
    Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "departamentos", id));
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
        refrescarNombres?.();
        Swal.fire("Eliminado", "", "success");
      }
    });
  };

  const editarUsuario = (u) => {
    setEditandoId(u.id);
    setNuevoNombre(u.nombre);
    setNuevoTipo(u.tipo);
  };

  const guardarEdicion = async (id) => {
    if (!nuevoNombre || !nuevoTipo) return;

    await updateDoc(doc(db, "departamentos", id), {
      nombre: nuevoNombre,
      tipo: nuevoTipo,
    });

    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, nombre: nuevoNombre, tipo: nuevoTipo } : u
      )
    );

    setEditandoId(null);
    refrescarNombres?.();
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container fluid className="py-4">
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          <i class="fa-solid fa-users"></i> Usuarios Registrados
        </Card.Header>

        <Card.Body>
          <div className="table-responsive">
            <Table hover bordered className={styles.table}>
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
                        <Form.Control
                          size="sm"
                          value={nuevoNombre}
                          onChange={(e) => setNuevoNombre(e.target.value)}
                        />
                      ) : (
                        u.nombre
                      )}
                    </td>

                    <td>
                      {editandoId === u.id ? (
                        <Form.Select
                          size="sm"
                          value={nuevoTipo}
                          onChange={(e) => setNuevoTipo(e.target.value)}
                        >
                          <option value="">Selecciona</option>
                          <option value="Switch">Switch</option>
                          <option value="Core">Core</option>
                        </Form.Select>
                      ) : (
                        u.tipo
                      )}
                    </td>

                    <td>
                      {editandoId === u.id ? (
                        <Stack direction="horizontal" gap={2} className="justify-content-center">
                          <Button size="sm" onClick={() => guardarEdicion(u.id)}>
                            Guardar
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditandoId(null)}
                          >
                            Cancelar
                          </Button>
                        </Stack>
                      ) : (
                        <Stack direction="horizontal" gap={2} className="justify-content-center">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => editarUsuario(u)}
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => eliminarUsuario(u.id)}
                          >
                            Eliminar
                          </Button>
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
