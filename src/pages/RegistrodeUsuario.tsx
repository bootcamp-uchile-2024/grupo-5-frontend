import { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";
import { useNavigate, Link } from "react-router-dom";
import ViewHideIcon from "../assets/icons/View_hide.svg";
import ViewIcon from "../assets/icons/View.svg";
import { hashPassword } from "../services/hashPassword";
import GloboTextoYellow from "../assets/RegistroUsuario/GloboTextoYellow.png";
import CuteCat from "../assets/RegistroUsuario/CuteCat.png";
import CoolDog from "../assets/RegistroUsuario/CoolDog.png";
import "./css/registro.css";
import { ModalRegistro } from "../components/ModalRegistro";
import { login } from "../services/loginService";
import { save } from "../states/loggedUserSlice";
import { useDispatch } from "react-redux";
import { setUserId } from "../states/cartSlice";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error(
    "La URL de la API no está definida en las variables de entorno"
  );
}

export const RegistrodeUsuario = () => {
  const [formData, setFormData] = useState({
    rutUsuario: "",
    contrasena: "",
    repetirContrasena: "",
    nombres: "",
    apellidos: "",
    correoElectronico: "",
    telefono: "",
    chkOfertas: true,
    chkTerminos: true,
  });

  const [feedback, setFeedback] = useState({
    error: null as string | null,
    success: null as string | null,
    loading: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    if (name === "rutUsuario") {
      formattedValue = formatearRUT(value);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : formattedValue,
    });

    if (name === "contrasena") {
      if (!validarContrasena(value)) {
        setFeedback({
          error: "La contraseña no cumple con los requisitos de seguridad",
          success: null,
          loading: false,
        });
      } else {
        setFeedback({ error: null, success: null, loading: false });
      }
    }

    if (name === "correoElectronico") {
      if (!validarCorreoElectronico(value)) {
        setFeedback({
          error: "El correo electrónico no es válido",
          success: null,
          loading: false,
        });
      } else {
        setFeedback({ error: null, success: null, loading: false });
      }
    }

    if (name === "rutUsuario" && formattedValue.includes("-")) {
      if (!validarRUT(formattedValue)) {
        setFeedback({
          error: "El RUT no es válido",
          success: null,
          loading: false,
        });
      } else {
        setFeedback({ error: "", success: null, loading: false });
      }
    }
  };

  const formatearRUT = (rut: string) => {
    rut = rut.replace(/[^0-9Kk]/g, "");

    if (rut.length > 1) {
      rut = rut.slice(0, -1) + "-" + rut.slice(-1);
    }

    return rut;
  };

  const validarContrasena = (contrasena: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(contrasena);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);
    return contrasena.length >= minLength && hasUpperCase && hasSpecialChar;
  };

  const validarCorreoElectronico = (correo: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(correo);
  };

  const validarRUT = (rut: string) => {
    const regex = /^[0-9]{7,8}-[0-9Kk]$/;
    if (!regex.test(rut)) {
      return false;
    }

    const [numero, digitoVerificador] = rut.split("-");
    return validarDigitoVerificador(numero, digitoVerificador);
  };

  const validarDigitoVerificador = (
    numero: string,
    digitoVerificador: string
  ) => {
    let suma = 0;
    let multiplicador = 2;

    for (let i = numero.length - 1; i >= 0; i--) {
      suma += parseInt(numero[i], 10) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const dvCalculado = 11 - (suma % 11);
    const dv =
      dvCalculado === 11
        ? "0"
        : dvCalculado === 10
        ? "K"
        : dvCalculado.toString();

    return dv.toUpperCase() === digitoVerificador.toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      rutUsuario,
      contrasena,
      repetirContrasena,
      nombres,
      apellidos,
      correoElectronico,
      telefono,
      chkTerminos,
    } = formData;
    if (
      !rutUsuario ||
      !contrasena ||
      !repetirContrasena ||
      !nombres ||
      !apellidos ||
      !correoElectronico ||
      !telefono ||
      !chkTerminos
    ) {
      setFeedback({
        error: "Debe llenar todos los campos del formulario",
        success: null,
        loading: false,
      });
      return;
    }

    if (formData.contrasena !== formData.repetirContrasena) {
      setFeedback({
        error: "Las contraseñas no coinciden",
        success: null,
        loading: false,
      });
      return;
    }

    try {
      hashPassword(formData.contrasena);

      const response = await fetch(`${apiUrl}/usuarios/registrar/cliente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rutUsuario: formData.rutUsuario,
          contrasena: formData.contrasena,
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          correoElectronico: formData.correoElectronico,
          telefono: formData.telefono,
          chkOfertas: formData.chkOfertas,
          chkTerminos: formData.chkTerminos,
        }),
      });

      if (response.status === 409 || response.status === 404) {
        setFeedback({
          error: `El usuario con RUT ${formData.rutUsuario} ya se encuentra registrado`,
          success: null,
          loading: false,
        });
        return;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      localStorage.clear();

      setFeedback({ error: null, success: "Registro exitoso", loading: false });
      setShowMessage(true);

      const user = await login(formData.correoElectronico, formData.contrasena);
      if (user) {
        dispatch(save(user));
        dispatch(setUserId(user.idUsuario));
        setShowMessage(true);
      } else {
        setFeedback({
          error: "Error al iniciar sesión automáticamente",
          success: null,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setFeedback({
        error: "El usuario con RUT ya se encuentra registrado",
        success: null,
        loading: false,
      });
    }
  };

  const irAPerfil = () => {
    setShowMessage(false);
    navigate("/perfil-usuario");
  };

  return (
    <MainLayout>
      <Container className="mt-3">
        <Row className="mb-0">
          <Col>
            <Link
              to="/"
              style={{
                color: "#404040",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              <span style={{ marginRight: "8px" }}>&lt;</span> Volver
            </Link>
          </Col>
        </Row>
        <Row className="align-items-center text-center">
          <Col md={12}>
            <h1
              style={{
                color: "#000000",
                fontSize: "40px",
                fontWeight: "900",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              Bienvenid@ a Petropolis
            </h1>
            <div className="info-box">
              <Image
                src={GloboTextoYellow}
                alt="Globo Amarillo"
                className="info-image"
                style={{
                  position: "relative",
                  top: "50px",
                  left: "-200px",
                  width: "600px",
                  height: "auto",
                }}
              />
              <p
                className="info-text"
                style={{ position: "relative", left: "18%", bottom: "60px" }}
              >
                Para comenzar la experiencia personalizada en Petropolis,
                rellena tus datos
              </p>
            </div>
            <Image
              src={CuteCat}
              alt="cat"
              style={{
                position: "absolute",
                top: "310px",
                left: "1px",
                width: "300px",
                height: "auto",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col md={5} className="offset-md-3">
            <Form onSubmit={handleSubmit}>
              <Form.Group
                as={Row}
                controlId="formNombre"
                className="d-flex justify-content-center align-items-center"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  Nombre
                </Form.Label>
                <Col sm={10} className="position-relative">
                  <Form.Control
                    type="text"
                    name="nombres"
                    placeholder="Nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                    // isValid={touched.nombres && !errors.nombres}
                    // isInvalid={!!errors.nombres}
                    style={{
                      borderRadius: "32px",
                      width: "370px",
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formApellidos"
                className="d-flex justify-content-center align-items-center"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  Apellidos
                </Form.Label>
                <Col sm={10} className="position-relative">
                  <Form.Control
                    type="text"
                    name="apellidos"
                    placeholder="Apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    // isValid={touched.apellidos && !errors.apellidos}
                    // isInvalid={!!errors.apellidos}
                    style={{
                      borderRadius: "32px",
                      width: "370px",
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formaRUT"
                className="d-flex justify-content-center align-items-center"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  Rut
                </Form.Label>
                <Col sm={10} className="position-relative">
                  <Form.Control
                    type="text"
                    name="rutUsuario"
                    placeholder="Rut"
                    value={formData.rutUsuario}
                    onChange={handleInputChange}
                    style={{
                      borderRadius: "32px",
                      width: "370px",
                    }}
                  />
                  {feedback.error === "El RUT no es válido" && (
                    <p style={{ color: "red" }}>{feedback.error}</p>
                  )}
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formaEmail"
                className="d-flex justify-content-center align-items-center"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  Correo
                </Form.Label>
                <Col sm={10} className="position-relative">
                  <Form.Control
                    type="email"
                    name="correoElectronico"
                    placeholder="Correo"
                    value={formData.correoElectronico}
                    onChange={handleInputChange}
                    style={{
                      borderRadius: "32px",
                      width: "370px",
                    }}
                  />
                  {feedback.error === "El correo electrónico no es válido" && (
                    <p style={{ color: "red" }}>{feedback.error}</p>
                  )}
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formaEmail"
                className="d-flex justify-content-center align-items-center"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  Teléfono
                </Form.Label>
                <Col sm={10} className="position-relative">
                  <Form.Control
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    // isValid={touched.telefono && !errors.telefono}
                    // isInvalid={!!errors.telefono}
                    style={{
                      borderRadius: "32px",
                      width: "370px",
                    }}
                  />
                </Col>
              </Form.Group>

              <div className="password-info">
                <Image
                  src={GloboTextoYellow}
                  alt="Globo Amarillo"
                  className="password-image"
                  style={{
                    zIndex: 1,
                    transform: "rotateY(180deg) scaleY(1.5)",
                    position: "relative",
                    top: "90px",
                    left: "-70px",
                  }}
                />
                <div className="password-text">
                  <p
                    className="password-title"
                    style={{
                      position: "relative",
                      top: "-80px",
                      left: "-25px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    Queremos proteger tus datos, una contraseña segura debe
                    tener:
                  </p>

                  <div
                    className="password-requirements"
                    style={{
                      position: "relative",
                      top: "-80px",
                      left: "-5px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      className="password-texto"
                      style={{
                        position: "relative",
                        left: "-85px",
                        top: "5px",
                      }}
                    >
                      ********
                    </p>
                    <p
                      className="password-texto"
                      style={{ position: "relative", left: "-35px" }}
                    >
                      AaBbCc
                    </p>
                    <p
                      className="password-texto"
                      style={{ position: "relative", left: "20px" }}
                    >
                      #$.%
                    </p>
                  </div>

                  <div
                    className="password-requirements"
                    style={{
                      position: "relative",
                      top: "-90px",
                      left: "10px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "70px",
                    }}
                  >
                    <p className="requirements-texto">Al menos 8 caracteres</p>
                    <p className="requirements-texto">Al menos una mayúscula</p>
                    <p className="requirements-texto">
                      Al menos un carácter especial
                    </p>
                  </div>
                </div>
              </div>

              <Form.Group
                as={Row}
                controlId="formContrasena"
                className="d-flex justify-content-center align-items-center"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  Contraseña
                </Form.Label>
                <Col sm={10} className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="contrasena"
                    placeholder="********"
                    value={formData.contrasena}
                    onChange={handleInputChange}
                    style={{
                      borderRadius: "32px",
                      width: "370px",
                    }}
                  />
                  <img
                    src={showPassword ? ViewIcon : ViewHideIcon}
                    alt="Toggle visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "100px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                  {feedback.error ===
                    "La contraseña no cumple con los requisitos de seguridad" && (
                    <p style={{ color: "red" }}>{feedback.error}</p>
                  )}
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formRepetirContrasena"
                className="d-flex justify-content-center align-items-center"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  Repetir Contraseña
                </Form.Label>
                <Col sm={10} className="position-relative">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="repetirContrasena"
                    placeholder="********"
                    value={formData.repetirContrasena}
                    onChange={handleInputChange}
                    // isValid={touched.correoElectronico && !errors.correoElectronico}
                    // isInvalid={!!errors.correoElectronico}
                    style={{
                      borderRadius: "32px",
                      width: "370px",
                    }}
                  />
                  <img
                    src={showConfirmPassword ? ViewIcon : ViewHideIcon}
                    alt="Toggle visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: "100px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                  {feedback.error === "Las contraseñas no coinciden" && (
                    <p style={{ color: "red" }}>{feedback.error}</p>
                  )}
                </Col>
              </Form.Group>

              <Row className="d-flex justify-content-center ">
                <Col sm={8}>
                  <Form.Group className="mb-2 mt-3">
                    <Form.Check
                      type="checkbox"
                      name="chkTerminos"
                      checked={formData.chkTerminos}
                      onChange={handleInputChange}
                      label="Acepto términos y condiciones"
                      required
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="custom-checkbox"
                    />
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Check
                      type="checkbox"
                      name="chkOfertas"
                      checked={formData.chkOfertas}
                      onChange={handleInputChange}
                      label="Quiero recibir ofertas y promociones"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="custom-checkbox"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={12} className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={feedback.loading}
                    style={{
                      backgroundColor: "#F2B705",
                      borderRadius: "32px",
                      padding: "8px 16px",
                      border: "none",
                      fontSize: "16px",
                      fontWeight: "500",
                      fontFamily: "Montserrat",
                      color: "#363636",
                      width: "271px",
                      height: "41px",
                    }}
                  >
                    {feedback.loading ? "Registrando..." : "Registrarse"}
                  </Button>
                  {feedback.error && <p className="error">{feedback.error}</p>}
                  {feedback.success && (
                    <p className="success">{feedback.success}</p>
                  )}
                </Col>
              </Row>
            </Form>
            <ModalRegistro
              show={showMessage}
              onHide={() => setShowMessage(false)}
              irAPerfil={irAPerfil}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Image
              src={CoolDog}
              alt="Perro"
              style={{
                position: "absolute",
                top: "943px",
                right: "50px",
                width: "450px",
                height: "auto",
              }}
            />
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};
