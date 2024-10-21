import { Link } from "react-router-dom";
import styles from "./nav.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <ul>
        <li>
          <Link to="">Perro</Link>
        </li>
        <li>
          <Link to="">Gato</Link>
        </li>
        <li>
          <Link to="">Exotico</Link>
        </li>
        <li>
        <Link to="">Ofertas</Link>
        </li>
        <li>
        <Link to="">Marcas</Link>
        </li>
        <li>
        <Link to="">Ayuda</Link>
        </li>
        <li>
        <Link to="">Blog</Link>
        </li>
        <li>
        <Link to="">Nosotros</Link>
        </li>
      </ul>
    </nav>
  );
}
