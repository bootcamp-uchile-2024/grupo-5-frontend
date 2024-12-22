import { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";
import { useNavigate, Link } from "react-router-dom";
import ViewHideIcon from "../assets/icons/View_hide.svg";
import ViewIcon from "../assets/icons/View.svg";
import "./css/registro.css";

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

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validarContrasena = (contrasena: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(contrasena);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);
    return contrasena.length >= minLength && hasUpperCase && hasSpecialChar;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarContrasena(formData.contrasena)) {
      setFeedback({
        ...feedback,
        error: "La contraseña no cumple con los requisitos de seguridad",
        success: null,
      });
      return;
    }

    if (formData.contrasena !== formData.repetirContrasena) {
      setFeedback({
        ...feedback,
        error: "Las contraseñas no coinciden",
        success: null,
      });
      return;
    }

    setFeedback({ ...feedback, loading: true, error: null, success: null });

    try {
      const requestData = {
        rutUsuario: formData.rutUsuario,
        contrasena: formData.contrasena,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correoElectronico: formData.correoElectronico,
        telefono: formData.telefono,
        chkOfertas: formData.chkOfertas,
      };

      console.log("Datos enviados a la API:", requestData);

      const response = await fetch(`${apiUrl}/usuarios/registrar/cliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok)
        throw new Error("Error en el registro. Intenta de nuevo.");

      setFeedback({ ...feedback, success: "Registro exitoso", loading: false });
      navigate("/perfil-usuario");
    } catch (error: any) {
      setFeedback({ ...feedback, error: error.message, loading: false });
    }
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
                src="src/assets/GloboTextoYellow.png"
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
              src="src/assets/CuteCat.png"
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
                    // isValid={touched.rutUsuario && !errors.rutUsuario}
                    // isInvalid={!!errors.rutUsuario}
                    style={{
                      borderRadius: "32px",
                      width: "370px",
                    }}
                  />
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
                    // isValid={touched.correoElectronico && !errors.correoElectronico}
                    // isInvalid={!!errors.correoElectronico}
                    style={{
                      borderRadius: "32px",
                      width: "370px",
                    }}
                  />
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
                  src="src/assets/GloboTextoYellow.png"
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
                    // isValid={touched.correoElectronico && !errors.correoElectronico}
                    // isInvalid={!!errors.correoElectronico}
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
                  <Form.Group
                    className="mb-2 mt-3"
                    style={{ paddingLeft: "80px" }}
                  >
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
                  <Form.Group className="mb-5" style={{ paddingLeft: "80px" }}>
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
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Image
              src="src/assets/CoolDog.png"
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

// const FormInput = ({
//   label,
//   type,
//   name,
//   value,
//   onChange,
//   placeholder,
//   required,
//   width = "100%",
//   moveStyle = {},
// }: any) => (
//   <Form.Group className="mb-1" style={moveStyle}>
//     <Row className="align-items-center g-0">
//       <Col xs={12} sm={4} className="p-0">
//         <Form.Label className="mb-0">{label}</Form.Label>
//       </Col>
//       <Col xs={12} sm={8} className="p-0">
//         <Form.Control
//           className="rounded"
//           style={{ width }}
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           required={required}
//         />
//       </Col>
//     </Row>
//   </Form.Group>
// );
