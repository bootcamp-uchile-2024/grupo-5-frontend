import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
      <li><Link to="/">Home Page</Link></li>
        <li>
          <a href="#">Inicio</a>
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
