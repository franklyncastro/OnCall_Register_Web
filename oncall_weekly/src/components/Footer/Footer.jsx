
import "../../style/Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>
        © {year} Todos los derechos reservados — <strong>Franklyn Castro</strong>
      </p>
    </footer>
  );
}

export default Footer;
