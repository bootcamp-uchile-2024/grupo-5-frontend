import { useState } from "react";
import { login } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import styles from "./css/LoginPage.module.css";
import { useDispatch } from "react-redux";
import { save } from "../states/loggedUserSlice";

interface IForm {
  user: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState<boolean>(false);
  const [validCredentials, setValidCredentials] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({
    user: "",
    password: "",
  });

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (form.user === "" || form.password === "") {
      setError(true);
      return;
    }

    const isAuthenticated = login(form);

    if (isAuthenticated) {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const roles = parsedUser.roles;
        dispatch(save({ user: form.user }));

        if (roles.includes("admin")) {
          navigate("/admin");
        } else if (roles.includes("user")) {
          navigate("/dashboard");
        }
      }
    } else {
      setValidCredentials(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError(false);
    setValidCredentials(true);
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <MainLayout>
      <div className={styles.loginContainer}>
        <h1>Acceder a tu cuenta</h1>
        <div className={styles.loginCard}>
          <form>
            <input
              type="text"
              placeholder="Usuario"
              name="user"
              onChange={handleChange}
              value={form.user}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              value={form.password}
            />
            <button type="submit" onClick={handleSubmit}>
              Ingresar
            </button>
          </form>
          {error && (
            <div className="error-message">Debes llenar todos los campos</div>
          )}
          {!validCredentials && (
            <div className="error-message">Credenciales inválidas</div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
