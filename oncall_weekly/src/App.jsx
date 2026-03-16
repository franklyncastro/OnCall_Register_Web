import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import AppRoutes from "./routes/AppRoutes ";
import "./style/App.css";

function App() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [nombresSwitch, setNombresSwitch] = useState([]);
  const [nombresCore, setNombresCore] = useState([]);
  const [loadingAsignaciones, setLoadingAsignaciones] = useState(true); // ✅ nuevo

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const obtenerAsignaciones = async () => {
    setLoadingAsignaciones(true); // ✅
    const querySnapshot = await getDocs(collection(db, "asignaciones"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    data.sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
    setAsignaciones(data);
    setLoadingAsignaciones(false); 
  };

  const agregarAsignacion = async (asignacion) => {
    await addDoc(collection(db, "asignaciones"), asignacion);
    obtenerAsignaciones();
  };

 
  const obtenerNombres = async () => {
    const querySnapshot = await getDocs(collection(db, "departamentos"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setNombresSwitch(data.filter((d) => d.tipo === "switch").map((d) => d.nombre));
    setNombresCore(data.filter((d) => d.tipo === "core").map((d) => d.nombre));
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
      obtenerNombres={obtenerNombres}
      loadingAsignaciones={loadingAsignaciones} // ✅
      theme={theme}
      toggleTheme={toggleTheme}
    />
  );
}

export default App;