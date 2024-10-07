import { Link } from "react-router-dom";
import styles from "./nav.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
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
