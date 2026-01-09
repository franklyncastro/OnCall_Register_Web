import { useState } from "react";
import Swal from "sweetalert2";
import "../../style/selectionCard.css";

function SeleccionCard({ asignaciones, agregarAsignacion, nombresSwitch, nombresCore }) {
  const [switchPerson, setSwitchPerson] = useState("");
  const [corePerson, setCorePerson] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const manejarGuardar = async () => {
    // Validación: campos vacíos
    if (!switchPerson || !corePerson || !fechaInicio || !fechaFin) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Completa todos los campos antes de guardar.",
      });
      return;
    }

    // Validación: fecha final >= fecha inicial
    if (new Date(fechaFin) < new Date(fechaInicio)) {
      Swal.fire({
        icon: "error",
        title: "Fecha incorrecta",
        text: "La fecha final no puede ser menor que la fecha inicial.",
      });
      return;
    }

    // Validación: evitar duplicados exactos
    const existe = asignaciones.some(
      (a) =>
        a.inicio === fechaInicio &&
        a.fin === fechaFin &&
        a.switch === switchPerson &&
        a.core === corePerson
    );

    if (existe) {
      Swal.fire({
        icon: "warning",
        title: "Registro duplicado",
        text: "Esta asignación ya existe.",
      });
      return;
    }

    // Crear nueva semana
    const nuevaSemana = {
      inicio: fechaInicio,
      fin: fechaFin,
      switch: switchPerson,
      core: corePerson,
      creado: new Date().toISOString(),
    };

    // Guardar en Firestore usando la función pasada desde App.jsx
    await agregarAsignacion(nuevaSemana);

    // ALERTA DE REGISTRO EXITOSO
    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "La asignación ha sido registrada correctamente.",
      timer: 2000,
      showConfirmButton: false,
    });

    // Limpiar campos
    setSwitchPerson("");
    setCorePerson("");
    setFechaInicio("");
    setFechaFin("");
  };

  return (
    <div className="seleccion-card">
      <h1><i className="fa-etch fa-solid fa-laptop"></i> On-Call App</h1>

      <div className="form-section">
        <h2>Switch</h2>
        <select
          value={switchPerson}
          onChange={(e) => setSwitchPerson(e.target.value)}
        >
          <option value="">Selecciona un nombre</option>
          {nombresSwitch.map((n, i) => (
            <option key={i} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="form-section">
        <h2>Core</h2>
        <select
          value={corePerson}
          onChange={(e) => setCorePerson(e.target.value)}
        >
          <option value="">Selecciona un nombre</option>
          {nombresCore.map((n, i) => (
            <option key={i} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="date-section">
        <label>Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />

        <label>Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
      </div>

      <button className="btn1" onClick={manejarGuardar}>Registrar</button>
    </div>
  );
}

export default SeleccionCard;
