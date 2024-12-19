import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import styles from "./css/LoginPage.module.css";
import { useDispatch } from "react-redux";
import { save } from "../states/loggedUserSlice";
import { Col, Row } from "react-bootstrap";
import Message from "../assets/icons/Buttons_message.svg";
import View from "../assets/icons/View.svg";
import { login } from "../services/loginService";
import { UsuarioDto } from "../interface/Usuarios/dto/UsuarioDto";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ rut: "", password: "" });
  const [validated, setValidated] = useState<{
    rut: boolean | null;
    password: boolean | null;
  }>({ rut: null, password: null });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isRutValid = form.rut !== "";
    const isPasswordValid = form.password !== "";

    setValidated({ rut: isRutValid, password: isPasswordValid });

    if (!isRutValid || !isPasswordValid) {
      return;
    }

    try {
      const usuario: UsuarioDto | null = await login(form.rut, form.password);

      if (usuario) {
        dispatch(save(usuario));
        navigate("/direccion");
      } else {
        setValidated({ rut: true, password: false });
      }
    } catch (error) {
      console.error("Error:", error);
      setValidated({ rut: false, password: false });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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

      <Row className="justify-content-center mt-5 mb-5 pt-5">
        <div className={styles.loginContainer}>
          <Col md={5} className="d-flex justify-content-end">
            <div className={styles.loginCard}>
              <h1>Iniciar sesión</h1>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="rut"
                    placeholder="Usuario"
                    onChange={handleChange}
                    value={form.rut}
                    className={
                      validated.rut === null
                        ? ""
                        : validated.rut
                        ? styles.validInput
                        : styles.invalidInput
                    }
                  />
                  <img className={styles.message} src={Message} alt="Message" />
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    value={form.password}
                    className={
                      validated.password === null
                        ? ""
                        : validated.password
                        ? styles.validInput
                        : styles.invalidInput
                    }
                  />
                  <img
                    className={styles.message}
                    src={View}
                    alt="View"
                    onClick={toggleShowPassword}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className={styles.forgotPassword}>
                  <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
                <div className={styles.sesion}>
                  <button type="submit">Iniciar sesión</button>
                </div>
              </form>
            </div>
          </Col>

          <Col
            md={1}
            className="d-flex justify-content-center align-items-center"
          >
            <div className={styles.rectangle}></div>
          </Col>

          <Col md={5}>
            <div className={styles.sideOptions}>
              <Link to="/registro" style={{ textDecoration: "none" }}>
                <button className={styles.registro}>Registrarme</button>
              </Link>
              <Link to="/registro-invitado" style={{ textDecoration: "none" }}>
                <button className={styles.invitado}>
                  Continuar como invitado
                </button>
              </Link>
            </div>
          </Col>
        </div>
      </Row>
    </MainLayout>
  );
};