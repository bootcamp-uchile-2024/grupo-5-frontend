import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { isAuth, logout } from "../../services/loginService";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import styles from "/src/layout/components/Header.module.css";
import { ModalCarrito } from "../../components/ModalCarrito";
import img from "../../assets/Group-7.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { del } from "../../states/loggedUserSlice";
import User from "../../assets/icons/user.svg";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const userState = useSelector((state: RootState) => state.loggedUser);
  const cart = useSelector((state: RootState) => state.cart.productos);
  const totalItems = cart.reduce(
    (total, producto) => total + producto.stockProducto,
    0
  );

  const modalCarritoRef = useRef<{ openModal: () => void }>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = isAuth();
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userState]);

  const handleCarritoClick = () => {
    if (modalCarritoRef.current) {
      modalCarritoRef.current.openModal();
    }
  };

  const handleLogout = () => {
    logout();
    dispatch(del());
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={img} alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar..."
          aria-label="Buscar"
        />
      </div>
      <div className={styles.cartContainer} onClick={handleCarritoClick}>
        <img src={User} alt="Avatar_usuario" />
        <span className={styles.cartCount}>{totalItems}</span>
        <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />
      </div>
      <div className={styles.userContainer}>
        {(userState.user && (userState.user.includes("admin") || userState.user.includes("user"))) && (
          <span className={styles.iconText}>
            <span>{userState.nombre}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </span>
        )}
        {!isLoggedIn && (
          <Link to="/login" className={styles.loginButton}>
            Login
          </Link>
        )}
      </div>
      <ModalCarrito ref={modalCarritoRef} />
    </header>
  );
};