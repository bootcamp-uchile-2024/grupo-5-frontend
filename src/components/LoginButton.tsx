import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth, logout } from "../services/loginService";
import styles from "./css/LoginButton.module.css";

export const LoginButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate("/");
    }

    useEffect(() => {
        setIsLoggedIn(isAuth() !== null);
    }, []);

    return (
        <div className={styles.loginContainer}>
            {
                isLoggedIn ?
                <button type="button" onClick={handleLogout} className={styles.textButton}>Logout</button>
                :
                <button type="button" onClick={() => navigate("/login")} className={styles.textButton}>Login</button>
            }
        </div>
    )
}