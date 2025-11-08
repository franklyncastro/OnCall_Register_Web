import { useState } from "react";
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
      alert("Completa todos los campos antes de guardar.");
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
    setSwitchPerson("");
    setCorePerson("");
    setFechaInicio("");
    setFechaFin("");
  };

  return (
    <div className="seleccion-card">
      <h1>Asignación On-Call</h1>

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

      <button class="btn1" onClick={manejarGuardar}>Registrar</button>
    </div>
  );
}

export default SeleccionCard;
