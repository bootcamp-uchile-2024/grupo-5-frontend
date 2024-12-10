import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuth, logout } from "../services/loginService";
import { del } from "../states/loggedUserSlice";
import styles from "./css/LoginButton.module.css";

export const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(del());
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    setIsLoggedIn(isAuth() !== null);
  }, []);

  return (
    <div className={styles.loginContainer}>
      {isLoggedIn ? (
        <button
          type="button"
          onClick={handleLogout}
          className={styles.textButton}
        >
          Logout
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate("/login")}
          className={styles.textButton}
        >
          Iniciar Sesión
        </button>
      )}
    </div>
  );
};