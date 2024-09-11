import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "../index.css";

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
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <div className="icons">
        <FontAwesomeIcon icon={faShoppingCart} className="icon" />
        <FontAwesomeIcon icon={faCircleUser} className="icon" />
      </div>
    </header>
  );
};

export default Header;
