import { logout } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import "../index.css";

  export const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate("/home");
    }

    return (
      <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-header">
          <h2>Menu</h2>
        </li>
        <li className="sidebar-item">
          <a href="#">Enlace 1</a>
        </li>
        <li className="sidebar-item">
          <a href="#">Enlace 2</a>
        </li>
        <li className="sidebar-item">
          <a href="#">Enlace 3</a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button type="button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
    );
  }





