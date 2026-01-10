import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NavbarApp.module.css";


function Navigation({ theme, toggleTheme }) {
  return (
    <Navbar
      expand="lg"
      bg={theme}
      data-bs-theme={theme}
      className={styles.navbar}
    >
      <Container>
        {/* BRAND */}
        <Navbar.Brand as={Link} to="/">
          Core Network App{" "}
           <img src="/core.png" alt="logo" width={30} />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          {/* LINKS */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/users">
              Usuarios
            </Nav.Link>

            <Nav.Link as={Link} to="/results">
              OnCall
            </Nav.Link>

            <NavDropdown title="Agregar">
              <NavDropdown.Item as={Link} to="/add">
                Usuario
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/selection">
                OnCall
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* SWITCH MODO OSCURO */}
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
