import { useState, useEffect } from "react";
import "./style/App.css";
import SeleccionCard from "./components/SeleccionCard/SeleccionCard";
import ResultadosCard from "./components/ResultadosCard/ResultadosCard";

function App() {
  // Inicializamos leyendo directamente del localStorage (mejor rendimiento)
  const [asignaciones, setAsignaciones] = useState(() => {
    const dataGuardada = localStorage.getItem("asignaciones");
    return dataGuardada ? JSON.parse(dataGuardada) : [];
  });

  // Guardar en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
  }, [asignaciones]);

  return (
    <div className="main-container">
      <SeleccionCard
        asignaciones={asignaciones}
        setAsignaciones={setAsignaciones}
      />
      <ResultadosCard
        asignaciones={asignaciones}
        setAsignaciones={setAsignaciones}
      />
    </div>
  );
}

export default App;

