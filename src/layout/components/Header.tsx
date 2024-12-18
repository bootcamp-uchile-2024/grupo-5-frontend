import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { isAuth } from "../../services/loginService";
import { LoginButton } from "../../components/LoginButton";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import styles from "/src/layout/components/Header.module.css";
import { ModalCarrito } from "../../components/ModalCarrito";
import img from "../../assets/Group-7.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const userState = useSelector((state: RootState) => state.loggedUser);
  const cart = useSelector((state: RootState) => state.cart.productos);
  const totalItems = cart.reduce(
    (total, producto) => total + producto.stock,
    0
  );

  const modalCarritoRef = useRef<{ openModal: () => void }>(null);

  useEffect(() => {
    const user = isAuth();
    if (user) {
      setIsLoggedIn(true);
      setUserRoles(user.roles || []);
    } else {
      setIsLoggedIn(false);
      setUserRoles([]);
    }
  }, []);

  const handleCarritoClick = () => {
    if (modalCarritoRef.current) {
      modalCarritoRef.current.openModal();
    }
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
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
        {!isLoggedIn ? (
          <Link to="/login" className={styles.iconLink}>
            <span className={styles.iconText}>
              <LoginButton />
            </span>
          </Link>
        ) : (
          <>
            {(userRoles.includes("admin") || userRoles.includes("user")) && (
              <span className={styles.iconText}>
                <span>{userState.user}</span>
                <LoginButton />
              </span>
            )}
          </>
        )}
      </div>
      <div className={styles.iconContainer}>
        <div className="position-relative" onClick={handleCarritoClick}>
          <FontAwesomeIcon icon={faShoppingCart} className={styles.icon} />
          {totalItems > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalItems}
              <span className="visually-hidden">productos en el carrito</span>
            </span>
          )}
        </div>
        <ModalCarrito ref={modalCarritoRef} />
      </div>
    </header>
  );
};
