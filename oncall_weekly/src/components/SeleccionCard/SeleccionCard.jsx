import { useState } from "react";
import Swal from "sweetalert2";
import "../../style/selectionCard.css";

function SeleccionCard({ asignaciones, setAsignaciones }) {
  const nombresSwitch = ["Franklyn Castro", "Jose Suarez"];
  const nombresCore = ["Luis Feliz", "Rafael Fabian", "Anglis Mercedes"];

  const [switchPerson, setSwitchPerson] = useState("");
  const [corePerson, setCorePerson] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const manejarGuardar = () => {

    if (!switchPerson || !corePerson || !fechaInicio || !fechaFin) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Completa todos los campos antes de guardar.",
      });
      return;
    }

    const nuevaSemana = {
      id: Date.now(),
      inicio: fechaInicio,
      fin: fechaFin,
      switch: switchPerson,
      core: corePerson,
    };

    setAsignaciones([...asignaciones, nuevaSemana]);

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
