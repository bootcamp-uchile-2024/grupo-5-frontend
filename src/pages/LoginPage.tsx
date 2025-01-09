import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import styles from "./css/LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../states/loggedUserSlice";
import { Col, Row } from "react-bootstrap";
import Message from "../assets/icons/Buttons_message.svg";
import View from "../assets/icons/View.svg";
import { login } from "../services/loginService";
import { UsuarioDto } from "../interface/Usuarios/dto/UsuarioDto";
import { RootState } from "../states/store";
import { setUserId, setCarroCompraId } from "../states/cartSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState<{
    email: boolean | null;
    password: boolean | null;
  }>({ email: null, password: null });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const productos = useSelector((state: RootState) => state.cart.productos);

  const fromModalCarrito = useSelector(
    (state: RootState) => state.navigation.fromModalCarrito
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = form.email !== "";
    const isPasswordValid = form.password !== "";

    setValidated({ email: isEmailValid, password: isPasswordValid });

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      const user: UsuarioDto | null = await login(form.email, form.password);

      if (user) {
        dispatch(save(user));
        dispatch(setUserId(user.idUsuario));

        const response = await fetch(
          `http://107.21.145.167:5001/carrocompra/${user.idUsuario}`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const idCarroCompra = data.idCarroCompra;

        dispatch(setCarroCompraId(idCarroCompra));

        for (const producto of productos) {
          await fetch(
            `http://107.21.145.167:5001/detalle-carro-compras/agregarProducto/${idCarroCompra}/${producto.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cantidad: producto.stockProducto,
                precio: producto.precioProducto,
              }),
            }
          );
        }

        if (productos.length === 0) {
          navigate("/");
        } else {
          navigate("/direccion");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error && error.message === "Contraseña incorrecta") {
        setError("Contraseña incorrecta");
      } else {
        setError("Error al iniciar sesión");
      }
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

      <h1 className={styles.titulo}>
        {fromModalCarrito ? "Continuar comprando como..." : "Iniciar sesión"}
      </h1>

      <Row className="justify-content-center mt-5 mb-5 pt-5">
        <div className={styles.loginContainer}>
          <Col md={5} className="d-flex justify-content-end">
            <div className={styles.loginCard}>
              <h1>Iniciar sesión</h1>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                    className={
                      validated.email === null
                        ? ""
                        : validated.email
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
                  {error === "Contraseña incorrecta" && (
                    <div className={styles.errorMessage}>
                      Contraseña incorrecta
                    </div>
                  )}
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
              {error && <p className={styles.error}>{error}</p>}
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
