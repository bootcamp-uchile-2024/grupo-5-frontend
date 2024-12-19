import { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";
import { useNavigate, Link } from "react-router-dom";  

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("La URL de la API no está definida en las variables de entorno");
}

export const RegistrodeUsuario = () => {
  const [formData, setFormData] = useState({
    rutUsuario: "",
    contrasena: "",
    nombres: "",
    apellidos: "",
    correoElectronico: "",
    telefono: "",
    chkOfertas: false,
    chkTerminos: false,
  });
  

  const [feedback, setFeedback] = useState({
    error: null as string | null,
    success: null as string | null,
    loading: false,
  });

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

    setFeedback({ ...feedback, loading: true, error: null, success: null });

    try {
      const response = await fetch(`${apiUrl}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rutUsuario: formData.rutUsuario,
          contrasena: formData.contrasena,
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          correoElectronico: formData.correoElectronico,
          telefono: formData.telefono,
          chkOfertas: formData.chkOfertas,
        }),
      });

      if (!response.ok) throw new Error("Error en el registro. Intenta de nuevo.");

      setFeedback({ ...feedback, success: "Registro exitoso", loading: false });
      navigate("/perfil-usuario");
    } catch (error: any) {
      setFeedback({ ...feedback, error: error.message, loading: false });
    }
  };


  return (
    <MainLayout>
      <Container className="mt-3">
        {/* Botón Volver */}
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
            <div className="info-box mt-3 mb-4">
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
              <p className="info-text" style={{ position: "relative", left: "-14%", top: "-50px" }}>
                Para comenzar la experiencia personalizada en Petropolis, rellena tus datos
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
          <Col md={4} className="offset-md-3">
            <Form onSubmit={handleSubmit}>
              <FormInput
                label="Nombre"
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                placeholder="Nombre"
                required
              />
              <FormInput
                label="Apellido"
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                placeholder="Apellido"
                required
              />
              <FormInput
                label="RUT"
                type="text"
                name="rutUsuario"
                value={formData.rutUsuario}
                onChange={handleInputChange}
                placeholder="RUT"
                required
              />
              <FormInput
                label="Correo"
                type="email"
                name="correoElectronico"
                value={formData.correoElectronico}
                onChange={handleInputChange}
                placeholder="Correo"
                required
              />
              <FormInput
                label="Teléfono"
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Teléfono"
                required
              />

              <div className="password-info">
                <Image
                  src="src/assets/GloboTextoYellow.png"
                  alt="Globo Amarillo"
                  className="password-image"
                  style={{
                    zIndex: 1,
                    transform: "rotateY(180deg) scaleY(1.5)",
                    position: "relative",
                    top: "35px",
                    left: "-30px",
                  }}
                />
                <div className="password-text">
                  <p
                    style={{
                      position: "relative",
                      top: "-130px",
                      left: "60px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    Queremos proteger tus datos, una contraseña segura debe tener:
                  </p>

                  <div
                    className="password-requirements"
                    style={{
                      position: "relative",
                      top: "-130px",
                      left: "100px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ position: "relative", left: "-105px" }}>********</p>
                    <p style={{ position: "relative", left: "-50px" }}>AaBbCc</p>
                    <p style={{ position: "relative", left: "30px" }}>#$.%</p>
                  </div>

                  <div
                    className="password-requirements"
                    style={{
                      position: "relative",
                      top: "-130px",
                      left: "95px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                  >
                    <p>Al menos 8 caracteres</p>
                    <p>Al menos una mayúscula</p>
                    <p>Al menos un carácter especial</p>
                  </div>
                </div>
              </div>

              <FormInput
                label="Contraseña"
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleInputChange}
                placeholder="********"
                required
                moveStyle={{ position: "relative", top: "-90px", left: "5px" }}
              />

              <FormInput
                label="Repetir Contraseña"
                type="password"
                name="repetirContrasena"
                onChange={handleInputChange}
                placeholder="********"
                required
                moveStyle={{ position: "relative", top: "-100px", left: "5px" }}
              />

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="chkTerminos"
                  checked={formData.chkTerminos}
                  onChange={handleInputChange}
                  label="Acepto términos y condiciones"
                  required
                  style={{
                    position: "relative",
                    top: "-80px",
                    left: "30px",
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="chkOfertas"
                  checked={formData.chkOfertas}
                  onChange={handleInputChange}
                  label="Quiero recibir ofertas y promociones"
                  style={{
                    position: "relative",
                    top: "-80px",
                    left: "30px",
                  }}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={feedback.loading}
                style={{
                  backgroundColor: "#F2B705",
                  color: "black",
                  borderRadius: "30px",
                  padding: "10px 20px",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  position: "relative",
                  left: "20%",
                  transform: "translateY(-100%)",
                }}
              >
                {feedback.loading ? "Registrando..." : "Registrarse"}
              </Button>
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
                top: "830px",
                left: "1060px",
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

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  width = "100%",
  moveStyle = {},
}: any) => (
  <Form.Group className="mb-1" style={moveStyle}>
    <Row className="align-items-center g-0">
      <Col xs={12} sm={4} className="p-0">
        <Form.Label className="mb-0">{label}</Form.Label>
      </Col>
      <Col xs={12} sm={8} className="p-0">
        <Form.Control
          className="rounded"
          style={{ width }}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </Col>
    </Row>
  </Form.Group>
);

