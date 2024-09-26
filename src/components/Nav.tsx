import { Link } from "react-router-dom";
import "../index.css";

export default function Nav() {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/home">Inicio</Link>
        </li>
        <li>
          <Link to="/catalogo-productos">Productos</Link>
        </li>
        <li>
          <a href="#">Sobre Nosotros</a>
        </li>
        <li>
          <a href="#">Servicios</a>
        </li>
        <li>
          <a href="#">Contacto</a>
        </li>
      </ul>
    </nav>
  );
}
