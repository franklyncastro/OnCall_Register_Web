import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import "./style/App.css";
import {Route, Routes} from 'react-router-dom'
import SeleccionCard from './components/SeleccionCard/SeleccionCard.jsx'
import ResultadosCard from "./components/ResultadosCard/ResultadosCard.jsx";
import Nav from "./components/Nav/Nav";
import Error from "./components/Error/Error.jsx";
import Footer from "./components/Footer/Footer.jsx";

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
    <div className="app-layout">
       <Nav/>
     <div className="main-container">

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/selection" element={<SeleccionCard
        asignaciones={asignaciones}
        setAsignaciones={setAsignaciones}
        />}/>
        <Route path="/results" element={<ResultadosCard
        asignaciones={asignaciones}
        setAsignaciones={setAsignaciones}
        />}/>
        <Route path="/*" element={<Error/>}/>
      </Routes>
     </div>
      <Footer/>
    </div>
  );
}

export default App;

