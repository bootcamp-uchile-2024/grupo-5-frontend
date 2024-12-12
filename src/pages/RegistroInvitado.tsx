import { MainLayout } from "../layout/MainLayout";
import ShoppingCart from "../assets/icons/shopping-cart.svg";
import Location from "../assets/icons/Location.svg";
import Caja from "../assets/icons/Caja.svg";
import Pago from "../assets/icons/dollar-alt.svg";
import Chevron from "../assets/icons/chevron-right.svg";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import styles from "./css/RegistroInvitado.module.css";
import { Link } from "react-router-dom";
import GatoRegistro from "../assets/RegistroUsuario/registrarme.png";

export const RegistroInvitado = () => {
  return (
    <MainLayout>
      <Container fluid>
        <div className={styles.customContainer}>
          <h1 className={styles.titulo}>Dirección</h1>
          <Row className="d-flex justify-content-center">
            <Col xs={6} md={2} className="d-flex justify-content-center mb-3">
              <div className={styles.icons}>
                <img src={ShoppingCart} alt="shopping-cart-img" />
              </div>
            </Col>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={Chevron}
                alt="chevron-right-img"
                className={styles.chevron}
              />
            </Col>
            <Col xs={6} md={2} className="d-flex justify-content-center mb-3">
              <div className={styles.iconLocation}>
                <img src={Location} alt="Location-img" />
              </div>
            </Col>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={Chevron}
                alt="chevron-right-img"
                className={styles.chevron}
              />
            </Col>
            <Col xs={6} md={2} className="d-flex justify-content-center mb-3">
              <div className={styles.icons}>
                <img src={Caja} alt="Caja-img" />
              </div>
            </Col>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={Chevron}
                alt="chevron-right-img"
                className={styles.chevron}
              />
            </Col>
            <Col xs={6} md={2} className="d-flex justify-content-center mb-3">
              <div className={styles.icons}>
                <img src={Pago} alt="Pago-img" />
              </div>
            </Col>
          </Row>
        </div>

        <Row className="d-flex justify-content-center py-4">
          <Col
            xs={10}
            md={10}
            style={{ borderBottom: "1px solid #BFBFBF" }}
          ></Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col xs={12} md={4}>
            <Container
              style={{
                backgroundColor: "#DFF4D2",
                borderRadius: "20px",
                width: "445px",
                height: "188px",
                padding: "10px 15px",
                position: "relative",
              }}
            >
              <div className={styles.contenedorParrafo}>
                <p className={styles.parrafo2}>
                  ¡Haz tu compra más fácil la próxima vez!
                </p>
                <p className={styles.parrafo5}>
                  Regístrate ahora y guarda tus direcciones de entrega para
                  futuras compras. Así, completar tu pedido será más rápido y
                  sencillo.
                </p>
              </div>

              <Link to="/registro">
                <Button
                  variant="warning"
                  style={{
                    width: "133px",
                    height: "40px",
                    borderRadius: "32px",
                    color: "#363636",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    marginLeft: "30%",
                  }}
                >
                  Registrate
                </Button>
              </Link>
              <img
                src={GatoRegistro}
                alt="GatoRegistro"
                className={styles.gatoRegistro}
              />
            </Container>
            <p className={styles.datos}>Mis datos</p>
            <Form
              style={{
                width: "423px",
                height: "212px",
              }}
            >
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre" />
              </Form.Group>
              <Form.Group controlId="formRut">
                <Form.Label>Rut</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu rut" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo" />
              </Form.Group>
              <Form.Group controlId="formTelefono">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="telefono" placeholder="Ingresa tu telefono" />
              </Form.Group>
            </Form>
          </Col>
          <Col
            xs={12}
            md={1}
            className="d-flex justify-content-center align-items-center"
          >
            <div className={styles.verticalLine}></div>
          </Col>
          <Col xs={12} md={4}>
            <Form>
              <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="tel" placeholder="Ingresa tu teléfono" />
              </Form.Group>
              <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu dirección" />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};
