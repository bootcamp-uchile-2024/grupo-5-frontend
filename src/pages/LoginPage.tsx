import { useState } from "react";
import { login } from "../services/loginService";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import styles from "./css/LoginPage.module.css";
import { useDispatch } from "react-redux";
import { save } from "../states/loggedUserSlice";
import { Row } from "react-bootstrap";

interface IForm {
  rut: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState<boolean>(false);
  const [validCredentials, setValidCredentials] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({
    rut: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.rut === "" || form.password === "") {
      setError(true);
      return;
    }

    const usuario = await login(form.rut, form.password);

    if (usuario) {
      dispatch(
        save({
          user: usuario.rut,
          nombres: usuario.nombres,
          avatar: usuario.avatar,
        })
      );
      navigate("/registro-invitado");
    } else {
      setValidCredentials(false);
    }
  };

  return (
    <MainLayout>
      <Row className="mb-5 pt-5">
        <Link to="/" className={styles.linkVolver}>
          <span
            aria-hidden="true"
            className="carousel-control-prev-icon"
            style={{
              width: "24px",
              height: "24px",
              filter: "invert(1)",
              marginRight: "8px",
              marginLeft: "30px",
            }}
          />
          Volver
        </Link>
      </Row>
      <h1 className={styles.titulo}>Continuar comprando como...</h1>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="RUT"
              name="rut"
              onChange={handleChange}
              value={form.rut}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              value={form.password}
            />
            <div className={styles.forgotPassword}>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit">Iniciar sesión</button>
          </form>
          {error && (
            <div className={styles.errorMessage}>
              Debes llenar todos los campos
            </div>
          )}
          {!validCredentials && (
            <div className={styles.errorMessage}>Credenciales inválidas</div>
          )}
        </div>

        <div className={styles.rectangle}></div>

        <div className={styles.sideOptions}>
          <Link to="/registro">
            <button>Registrarme</button>
          </Link>
          <Link to="/registro-invitado">
            <button>Continuar como invitado</button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};
