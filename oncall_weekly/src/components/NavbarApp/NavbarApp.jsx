import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
} from "react-bootstrap";
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
        <Navbar.Brand as={Link} to="/">
          Core Network App
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/users">Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/results">OnCall</Nav.Link>

            <NavDropdown title="Agregar">
              <NavDropdown.Item as={Link} to="/add">
                Usuario
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/selection">
                OnCall
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Button
            variant={theme === "dark" ? "light" : "dark"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
