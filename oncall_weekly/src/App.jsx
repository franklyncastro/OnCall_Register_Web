import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import AppRoutes from "./routes/AppRoutes ";

import "./style/App.css";

function App() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [nombresSwitch, setNombresSwitch] = useState([]);
  const [nombresCore, setNombresCore] = useState([]);

  // 🌙 Modo oscuro
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 🔹 Firestore
  const obtenerAsignaciones = async () => {
    const querySnapshot = await getDocs(collection(db, "asignaciones"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
    setAsignaciones(data);
  };

  const agregarAsignacion = async (asignacion) => {
    await addDoc(collection(db, "asignaciones"), asignacion);
    obtenerAsignaciones();
  };

  const obtenerNombres = async () => {
    const querySnapshot = await getDocs(collection(db, "departamentos"));
    const data = querySnapshot.docs.map((doc) => doc.data());

    setNombresSwitch(
      data.filter((d) => d.tipo === "switch").map((d) => d.nombre)
    );
    setNombresCore(
      data.filter((d) => d.tipo === "core").map((d) => d.nombre)
    );
  };

  const actualizarNombres = (data) => {
    setNombresSwitch(
      data.filter((d) => d.tipo === "switch").map((d) => d.nombre)
    );
    setNombresCore(
      data.filter((d) => d.tipo === "core").map((d) => d.nombre)
    );
  };

  useEffect(() => {
    obtenerAsignaciones();
    obtenerNombres();
  }, []);

  return (
    <AppRoutes
      asignaciones={asignaciones}
      setAsignaciones={setAsignaciones}
      agregarAsignacion={agregarAsignacion}
      nombresSwitch={nombresSwitch}
      nombresCore={nombresCore}
      actualizarNombres={actualizarNombres}
      obtenerNombres={obtenerNombres}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  );
}

export default App;
