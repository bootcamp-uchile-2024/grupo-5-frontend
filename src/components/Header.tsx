import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">Petropolis</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          aria-label="Buscar"
          className="search-input"
        />
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faShoppingCart} className="icon" />
        <span className="icon-text">Carrito</span>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faCircleUser} className="icon" />
        <Link to="" className="icon-link">
          <span className="icon-text">Usuario</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
