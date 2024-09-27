import { Link } from "react-router-dom";
import "../index.css";

export default function Nav() {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/catalogo-productos">Productos</Link>
        </li>
        <li>
          <Link to="/admin">Administrador</Link>
        </li>
        <li>
          <a href="#">Contacto</a>
        </li>
      </ul>
    </nav>
  );
}
