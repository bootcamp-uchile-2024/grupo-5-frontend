import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { isAuth } from "../../services/loginService";
import { LoginButton } from "../../components/LoginButton";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from "./header.module.css";
import { ModalCarrito } from "../../components/ModalCarrito";
import img from "../../assets/Group-7.svg";

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

    const handleCarritoClick = () => {
        const carritoButton = document.getElementById('carritoButton');
        if (carritoButton) {
            carritoButton.click();
        }
    };

    return (
        <header className={styles.header}>
          <Link to="/"><img src={img} alt="Logo" className={styles.logo}  /></Link>
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
                                <LoginButton />
                            </span>
                        )}
                    </>
                )}
            </div>
            <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={faShoppingCart} className={styles.icon} onClick={handleCarritoClick} />
                <span className={styles.iconText}></span>
                <ModalCarrito />
            </div>            
        </header>
    );
};