import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SeleccionCard from "./components/SeleccionCard/SeleccionCard.jsx";
import ResultadosCard from "./components/ResultadosCard/ResultadosCard.jsx";
import Nav from "./components/Nav/Nav";
import Error from "./components/Error/Error.jsx";
import Footer from "./components/Footer/Footer.jsx";
import RegisterUser from "./components/RegisterUser/RegisterUser.jsx";
import UsuariosCard from "./components/UsuariosCard/UsuariosCard.jsx";

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase/config";

import "./style/App.css";

function App() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [nombresSwitch, setNombresSwitch] = useState([]);
  const [nombresCore, setNombresCore] = useState([]);

  // 🔹 Obtener asignaciones desde Firestore
  const obtenerAsignaciones = async () => {
    const querySnapshot = await getDocs(collection(db, "asignaciones"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Ordenar por fecha de inicio
    data.sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
    setAsignaciones(data);
  };

  // 🔹 Función para agregar asignación a Firestore
  const agregarAsignacion = async (asignacion) => {
    await addDoc(collection(db, "asignaciones"), asignacion);
    obtenerAsignaciones(); // refrescar la lista
  };

  // 🔹 Obtener nombres de departamentos desde Firestore
  const obtenerNombres = async () => {
    const querySnapshot = await getDocs(collection(db, "departamentos"));
    const data = querySnapshot.docs.map((doc) => doc.data());

    setNombresSwitch(
      data.filter((d) => d.tipo === "switch").map((d) => d.nombre)
    );
    setNombresCore(data.filter((d) => d.tipo === "core").map((d) => d.nombre));
  };

  // 🔹 Actualizar nombres cuando se agregan desde RegisterUser
  const actualizarNombres = (data) => {
    setNombresSwitch(
      data.filter((d) => d.tipo === "switch").map((d) => d.nombre)
    );
    setNombresCore(data.filter((d) => d.tipo === "core").map((d) => d.nombre));
  };

  useEffect(() => {
    obtenerAsignaciones();
    obtenerNombres();
  }, []);

  return (
    <div className="app-layout">
      <Nav />

      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/selection"
            element={
              <SeleccionCard
                asignaciones={asignaciones}
                agregarAsignacion={agregarAsignacion}
                nombresSwitch={nombresSwitch}
                nombresCore={nombresCore}
              />
            }
          />

          <Route
            path="/add"
            element={<RegisterUser actualizarNombres={actualizarNombres} />}
          />
          <Route path="/users" element={<UsuariosCard refrescarNombres={obtenerNombres}/>} />

          <Route
            path="/results"
            element={
              <ResultadosCard
                asignaciones={asignaciones}
                setAsignaciones={setAsignaciones} // para eliminar asignaciones temporalmente
              />
            }
          />

          <Route path="/*" element={<Error />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
