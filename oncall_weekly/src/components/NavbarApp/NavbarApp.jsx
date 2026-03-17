import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./NavbarApp.module.css";

function Navigation({ theme, toggleTheme, isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    toast.success("Sesión cerrada");
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg={theme} data-bs-theme={theme} className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="fa-solid fa-hexagon-nodes"></i> Core Network App{" "}
          <img src="/core.png" alt="logo" width={30} />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">

            {/* ✅ Solo visible si está autenticado */}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/users">
                  <i className="fa-solid fa-users"></i> Usuarios
                </Nav.Link>

                <Nav.Link as={Link} to="/results">
                  <i className="fa-solid fa-address-card"></i> Semana Oncall
                </Nav.Link>

                <NavDropdown title="Agregar">
                  <NavDropdown.Item as={Link} to="/add">
                    <i className="fa-solid fa-user-plus"></i> Usuario
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/selection">
                    <i className="fa-solid fa-file-circle-plus"></i> OnCall
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* ✅ Botón login/logout */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "0.5px solid #e24b4a",
                  color: "#e24b4a",
                  borderRadius: "8px",
                  padding: "5px 14px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                <i className="fa-solid fa-right-from-bracket me-1"></i>
                Salir
              </button>
            ) : (
              <Nav.Link as={Link} to="/login" style={{ fontWeight: 700, color: "#185fa5" }}>
                <i className="fa-solid fa-lock me-1"></i>
                Admin
              </Nav.Link>
            )}

            {/* Switch tema */}
            <label className={styles.uiSwitch}>
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
                aria-label="Cambiar modo oscuro"
              />
              <div className={styles.slider}>
                <div className={styles.circle}></div>
              </div>
            </label>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;