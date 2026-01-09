import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Swal from "sweetalert2";
import '../../style/RegisterUser.css'

function RegisterUser({ actualizarNombres }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");

  const manejarGuardar = async () => {
    if (!nombre || !tipo) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Selecciona un departamento y escribe un nombre.",
      });
      return;
    }

    try {
      // Guardar en Firestore
      await addDoc(collection(db, "departamentos"), {
        nombre,
        tipo,
      });

      // Obtener todos los nombres nuevamente para actualizar selects
      const querySnapshot = await getDocs(collection(db, "departamentos"));
      const data = querySnapshot.docs.map(doc => doc.data());

      // Actualizar estados en App.jsx
      actualizarNombres(data);

      Swal.fire({
        icon: "success",
        title: "Empleado agregado",
        text: "Se ha agregado correctamente a la base de datos.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Limpiar campos
      setNombre("");
      setTipo("");
    } catch (error) {
      console.error("Error agregando empleado:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el empleado.",
      });
    }
  };

  return (
    <div className="departamento-form">
      <h2 className="titleH2">Agregar Empleado</h2>

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="" className="inputUser">Selecciona departamento</option>
        <option value="switch">Switch</option>
        <option value="core">Core</option>
      </select>

      <input
        type="text"
        placeholder="Nombre del empleado"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="inputUser"
      />

      <button onClick={manejarGuardar}>GUARDAR</button>
    </div>
  );
}

export default RegisterUser;
