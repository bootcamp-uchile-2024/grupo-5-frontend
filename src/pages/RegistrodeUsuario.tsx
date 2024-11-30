import { useState } from "react";
import { Form, Button, Container, Row, Col, Image, Alert } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";

export const RegistrodeUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    correo: "",
    telefono: "",
    contraseña: "",
    repetirContraseña: "",
    terminos: false,
    ofertas: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <MainLayout>
      <Container className="mt-5">
        <Row className="align-items-center">
          {/* Imagen del gato */}
          <Col xs={3} className="d-flex justify-content-start" style={{ marginLeft: "-115px", marginTop: "-330px" }}>
            <Image
              src="src/assets/CuteCat.png"
              rounded
              style={{ maxWidth: "200px" }}
              alt="Gato"
            />
          </Col>

          {/* Texto con el globo */}
          <Col xs={9} className="position-relative">
            {/* Imagen del globo como fondo */}
            <Image
              src="src/assets/GloboTextoYellow.png"
              alt="Globo de texto"
              className="position-absolute"
              style={{
                top: "-5px",  // Ajusta la posición vertical
                left: "-70px", // Ajusta la posición horizontal
                zIndex: 0,     // Asegura que el globo quede detrás del texto
                maxWidth: "100%",
              }}
            />
            {/* Texto principal */}
            <h1 className="mb-4" style={{ position: "relative", zIndex: 1, top: "-50px", left: "-280px" }}>
              Bienvenid@ a Petropolis
            </h1>
            <p style={{ position: "relative", zIndex: 1, top: "-10px" }}>
              Para comenzar la experiencia personalizada en Petropolis, rellena tus datos:
            </p>
            
            {/* Aquí movemos solo el formulario */}
            <Form onSubmit={handleSubmit} style={{ marginTop: '80px' }}>
              {/* Campos del formulario */}
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu nombre"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRUT">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleInputChange}
                  placeholder="Ej: 12345678-9"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCorreo">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  placeholder="correo@ejemplo.com"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Ej: +56912345678"
                />
              </Form.Group>

              <Alert variant="info">
                Una contraseña segura debe tener al menos 8 caracteres, una mayúscula y un carácter especial.
              </Alert>

              <Form.Group className="mb-3" controlId="formContraseña">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleInputChange}
                  placeholder="Contraseña"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRepetirContraseña">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="repetirContraseña"
                  value={formData.repetirContraseña}
                  onChange={handleInputChange}
                  placeholder="Repetir contraseña"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTerminos">
                <Form.Check
                  type="checkbox"
                  name="terminos"
                  label="Acepto términos y condiciones"
                  checked={formData.terminos}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formOfertas">
                <Form.Check
                  type="checkbox"
                  name="ofertas"
                  label="Quiero recibir ofertas"
                  checked={formData.ofertas}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Registrarme
              </Button>
            </Form>
          </Col>
          
          {/* Imagen adicional al final, frente al campo de Contraseña */}
          <Col xs={3} className="d-flex justify-content-end" style={{ marginTop: '20px' }}>
  <Image
    src="src/assets/CoolDog.png" 
    rounded
    style={{
      maxWidth: "1000px",              // Controlamos el tamaño máximo
      position: "relative",           // Necesario para mover la imagen
      top: "64px",                    // Mueve la imagen verticalmente
      left: "1111px",                   // Mueve la imagen horizontalmente
    }}
    alt="Imagen perrito"
  />
</Col>

        </Row>
      </Container>
    </MainLayout>
  );
};
