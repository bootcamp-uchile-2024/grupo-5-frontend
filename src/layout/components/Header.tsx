import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";
import { useEffect, useState } from "react";
import { isAuth } from "../../services/loginService";
import { LoginButton } from "../../components/LoginButton";
import { Link } from "react-router-dom";

export const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userRoles, setUserRoles] = useState<string[]>([]);

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
    
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Petropolis</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar..."
          aria-label="Buscar"
          className={styles.searchInput}
        />
      </div>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faShoppingCart} className={styles.icon} />
        <span className={styles.iconText}>Carrito</span>
      </div>
      <div className={styles.iconContainer}>
      <FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
      {!isLoggedIn ? (
        <Link to="/login">
          <span className={styles.iconText}>
            <LoginButton />
          </span>
        </Link>
      ) : (
        <>
          {(userRoles.includes("admin") || userRoles.includes("user")) && (
            <span className={styles.iconText}>
                <LoginButton />
            </span>
        )}
        </>
      )}
    </div>
    </header>
  );
};
