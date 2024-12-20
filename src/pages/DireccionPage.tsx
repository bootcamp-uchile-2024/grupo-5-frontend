import { useState, useEffect } from "react";
import { MainLayout } from "../layout/MainLayout";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

export const DireccionPage = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    region: "",
    comuna: "",
    calle: "",
    numero: "",
    referencia: "",
    alias: "",
  });

  const [comunas, setComunas] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [direccionesGuardadas, setDireccionesGuardadas] = useState<any[]>([]);

  useEffect(() => {
    const fetchRegiones = async () => {
      const response = await fetch(`${apiUrl}/region`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setRegiones(data);
    };

    fetchRegiones();
  }, []);

  useEffect(() => {
    if (!datosFormulario.region) return;

    const fetchComunas = async () => {
      const response = await fetch(`${apiUrl}/comuna/region/${datosFormulario.region}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setComunas(data);
    };

    fetchComunas();
  }, [datosFormulario.region]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const handleSave = () => {
    setDireccionesGuardadas([...direccionesGuardadas, datosFormulario]);
    setShowModal(false);
  };

  return (
    <MainLayout>
      <Container>
        <Row className="text-center">
          <Col>
            <Button
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#F2B705",
                fontSize: "32px",
                color: "white",
                marginTop: "20px",
              }}
              onClick={() => setShowModal(true)}
            >
              <span style={{ fontSize: "100px", position: "relative", top: "-42px" }}>+</span>
            </Button>
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "32px",
                color: "#535353",
                marginTop: "15px",
              }}
            >
              Agregar Dirección
            </p>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Body style={{ backgroundColor: "#F2FAFD", paddingRight: "60px", borderRadius: "45px" }}>
          <img
            src="src/assets/icons/SimbMas.svg"
            style={{
              width: "24px",
              height: "24px",
              marginLeft: "200px",
              position: "relative",
              top: "42px",
            }}
          />
          <Container>
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "50px",
                textAlign: "center",
                marginLeft: "80px",
                margin: 10,
              }}
            >
              Editar Dirección
            </p>
            <Form>
              <Form.Group as={Row} className="mb-2 align-items-center">
                <Form.Label column sm={3} className="text-end">
                  Región
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="region"
                    value={datosFormulario.region}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione una región</option>
                    {regiones.map((region: any) => (
                      <option key={region.idRegion} value={region.idRegion}>
                        {region.nombreRegion}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2 align-items-center">
                <Form.Label column sm={3} className="text-end">
                  Comuna
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="comuna"
                    value={datosFormulario.comuna}
                    onChange={handleChange}
                    disabled={!datosFormulario.region}
                  >
                    <option value="">Seleccione una comuna</option>
                    {comunas.map((comuna: any) => (
                      <option key={comuna.idComuna} value={comuna.idComuna}>
                        {comuna.nombreComuna}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2 align-items-center">
                <Form.Label column sm={3} className="text-end">
                  Calle
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="calle"
                    value={datosFormulario.calle}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2 align-items-center">
                <Form.Label column sm={3} className="text-end">
                  Número
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="numero"
                    value={datosFormulario.numero}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2 align-items-center">
                <Form.Label column sm={3} className="text-end">
                  Referencia
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="referencia"
                    value={datosFormulario.referencia}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2 align-items-center">
                <Form.Label column sm={3} className="text-end">
                  Alias
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="alias"
                    value={datosFormulario.alias}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <div className="text-center mt-3">
                <Button
                  onClick={handleSave}
                  style={{
                    width: "172px",
                    height: "40px",
                    borderRadius: "32px",
                    backgroundColor: "#F2B705",
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  Guardar Dirección
                </Button>
              </div>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>

      <div style={{ marginTop: "20px" }}>
        {direccionesGuardadas.map((direccion, index) => (
          <div key={index} style={{ backgroundColor: "#F6FBFE", padding: "24px", borderRadius: "32px" }}>
            <h4>{direccion.alias}</h4>
            <p>{direccion.calle}</p>
            <p>{direccion.region}</p>
            <p>{direccion.numero}</p>
            <p>{direccion.referencia}</p>

            <div className="d-flex justify-content-end mt-3">
              <Button
                style={{
                  width: "60px",
                  height: "60px",
                  padding: "8px 16px",
                  gap: "8px",
                  borderRadius: "32px",
                  backgroundColor: "#F2B705",
                  marginRight: "10px", 
                }}
              >
                <img
                  src="src/assets/icons/LapizVector.svg"
                  alt="Botón amarillo"
                  style={{ width: "24px", height: "24px" }}
                />
              </Button>
              <Button
                style={{
                  width: "60px",
                  height: "60px",
                  padding: "8px 16px",
                  gap: "8px",
                  borderRadius: "32px",
                  border: "none solid",
                }}
              >
                <img
                  src="src/assets/icons/trash.svg"
                  alt="Botón con borde"
                  style={{ width: "24px", height: "24px" }}
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
