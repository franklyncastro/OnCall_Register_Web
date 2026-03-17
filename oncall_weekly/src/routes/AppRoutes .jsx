import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import SeleccionCard from "../components/SeleccionCard/SeleccionCard";
import ResultadosCard from "../components/ResultadosCard/ResultadosCard";
import RegisterUser from "../components/RegisterUser/RegisterUser";
import UsuariosCard from "../components/UsuariosCard/UsuariosCard";
import NavbarApp from "../components/NavbarApp/NavbarApp";
import Footer from "../components/Footer/Footer";
import Error from "../components/Error/Error";
import Login from "../components/Login/Login";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

function AppRoutes({
  asignaciones,
  setAsignaciones,
  agregarAsignacion,
  nombresSwitch,
  nombresCore,
  obtenerNombres,
  loadingAsignaciones,
  theme,
  toggleTheme,
  isAuthenticated,
  onLogin,
  onLogout,
}) {
  return (
    <div className="app-layout">
      <NavbarApp
        theme={theme}
        toggleTheme={toggleTheme}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />

      <div className="main-container">
        <Routes>
          {/* ✅ Público */}
          <Route path="/" element={<Home asignaciones={asignaciones} />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />

          {/* ✅ Protegidas */}
          <Route path="/results" element={
            <PrivateRoute>
              <ResultadosCard
                asignaciones={asignaciones}
                setAsignaciones={setAsignaciones}
                loading={loadingAsignaciones}
              />
            </PrivateRoute>
          } />

          <Route path="/users" element={
            <PrivateRoute>
              <UsuariosCard refrescarNombres={obtenerNombres} />
            </PrivateRoute>
          } />

          <Route path="/add" element={
            <PrivateRoute>
              <RegisterUser obtenerNombres={obtenerNombres} />
            </PrivateRoute>
          } />

          <Route path="/selection" element={
            <PrivateRoute>
              <SeleccionCard
                asignaciones={asignaciones}
                agregarAsignacion={agregarAsignacion}
                nombresSwitch={nombresSwitch}
                nombresCore={nombresCore}
              />
            </PrivateRoute>
          } />

          <Route path="/*" element={<Error />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default AppRoutes;