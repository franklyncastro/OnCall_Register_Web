import { useState, useEffect } from "react";
import "./style/App.css";
import SeleccionCard from "./components/SeleccionCard/SeleccionCard";
import ResultadosCard from "./components/ResultadosCard/ResultadosCard";

function App() {
  const [asignaciones, setAsignaciones] = useState([]);

  // Cargar del localStorage
  useEffect(() => {
    const dataGuardada = localStorage.getItem("asignaciones");
    if (dataGuardada) setAsignaciones(JSON.parse(dataGuardada));
  }, []);

  // Guardar en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
  }, [asignaciones]);

  return (
    <div className="main-container">
      <SeleccionCard asignaciones={asignaciones} setAsignaciones={setAsignaciones} />
      <ResultadosCard asignaciones={asignaciones} setAsignaciones={setAsignaciones} />
    </div>
  );
}

export default App;
