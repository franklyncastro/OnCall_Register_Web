import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import Swal from "sweetalert2";
import "../../style/resultCard.css";

function UsuariosCard() {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("");

  // 🔹 Obtener usuarios desde Firestore
  const obtenerUsuarios = async () => {
    const querySnapshot = await getDocs(collection(db, "departamentos"));
    const data = querySnapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
    setUsuarios(data);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // 🔹 Eliminar usuario
  const eliminarUsuario = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "departamentos", id));
        setUsuarios(usuarios.filter((u) => u.id !== id));
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El usuario fue eliminado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // 🔹 Iniciar edición
  const editarUsuario = (usuario) => {
    setEditandoId(usuario.id);
    setNuevoNombre(usuario.nombre);
    setNuevoTipo(usuario.tipo);
  };

  // 🔹 Guardar cambios de edición
  const guardarEdicion = async (id) => {
    if (!nuevoNombre || !nuevoTipo) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos",
        text: "Completa el nombre y el departamento.",
      });
      return;
    }

    const usuarioRef = doc(db, "departamentos", id);
    await updateDoc(usuarioRef, { nombre: nuevoNombre, tipo: nuevoTipo });

    setUsuarios(
      usuarios.map((u) =>
        u.id === id ? { ...u, nombre: nuevoNombre, tipo: nuevoTipo } : u
      )
    );
    setEditandoId(null);

    Swal.fire({
      icon: "success",
      title: "Actualizado",
      text: "El usuario se actualizó correctamente.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="resultados-card">
      <div className="title">
        <h2>
          <i className="fa-solid fa-users"></i> Usuarios
        </h2>
      </div>

      {usuarios.length === 0 ? (
        <p className="vacio">No hay usuarios registrados.</p>
      ) : (
        <div className="table-wrapper">
          <table className="shuffle-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Departamento</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td data-label="Nombre">
                    {editandoId === u.id ? (
                      <input
                        type="text"
                        value={nuevoNombre}
                        onChange={(e) => setNuevoNombre(e.target.value)}
                      />
                    ) : (
                      u.nombre
                    )}
                  </td>
                  <td data-label="Departamento">
                    {editandoId === u.id ? (
                      <select
                        value={nuevoTipo}
                        onChange={(e) => setNuevoTipo(e.target.value)}
                      >
                        <option value="">Selecciona</option>
                        <option value="switch">Switch</option>
                        <option value="core">Core</option>
                      </select>
                    ) : (
                      u.tipo
                    )}
                  </td>
                  <td data-label="Acción">
                    {editandoId === u.id ? (
                      <button
                        className="button"
                        onClick={() => guardarEdicion(u.id)}
                      >
                        💾
                      </button>
                    ) : (
                      <div className="containerUsers">
                        <div>
                          <button
                            className="button buttonUseredit"
                            onClick={() => editarUsuario(u)}
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                        </div>
                        <div>
                          <button
                            className="button buttonUserdelete"
                            onClick={() => eliminarUsuario(u.id)}
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsuariosCard;
