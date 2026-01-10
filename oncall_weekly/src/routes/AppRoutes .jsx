import { Routes, Route } from "react-router-dom";

import Home from "../components/Home/Home";
import SeleccionCard from "../components/SeleccionCard/SeleccionCard";
import ResultadosCard from "../components/ResultadosCard/ResultadosCard";
import RegisterUser from "../components/RegisterUser/RegisterUser";
import UsuariosCard from "../components/UsuariosCard/UsuariosCard";
import NavbarApp from "../components/NavbarApp/NavbarApp";
import Footer from "../components/Footer/Footer";
import Error from "../components/Error/Error";

function AppRoutes({
  asignaciones,
  setAsignaciones,
  agregarAsignacion,
  nombresSwitch,
  nombresCore,
  actualizarNombres,
  obtenerNombres,
  theme,
  toggleTheme,
}) {
  return (
    <div className="app-layout">
      <NavbarApp theme={theme} toggleTheme={toggleTheme} />

      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home asignaciones={asignaciones}/>} />

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

          <Route
            path="/users"
            element={<UsuariosCard refrescarNombres={obtenerNombres} />}
          />

          <Route
            path="/results"
            element={
              <ResultadosCard
                asignaciones={asignaciones}
                setAsignaciones={setAsignaciones}
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

export default AppRoutes;
