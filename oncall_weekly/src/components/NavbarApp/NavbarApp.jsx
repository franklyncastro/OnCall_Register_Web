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
         <i class="fa-solid fa-hexagon-nodes"></i> Core Network App{" "}
           <img src="/core.png" alt="logo" width={30} />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          {/* LINKS */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/users">
             <i class="fa-solid fa-users"></i> Usuarios
            </Nav.Link>

            <Nav.Link as={Link} to="/results">
              <i class="fa-solid fa-address-card"></i> Semana Oncall
            </Nav.Link>

            <NavDropdown title="Agregar">
              <NavDropdown.Item as={Link} to="/add">
                <i class="fa-solid fa-user-plus"></i> Usuario
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/selection">
               <i class="fa-solid fa-file-circle-plus"></i> OnCall
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
