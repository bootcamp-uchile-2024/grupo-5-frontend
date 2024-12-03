import { MainLayout } from "../layout/MainLayout";
import ShoppingCart from "../assets/icons/shopping-cart.svg";
import Location from "../assets/icons/Location.svg";
import Caja from "../assets/icons/Caja.svg";
import Pago from "../assets/icons/dollar-alt.svg";
import Chevron from "../assets/icons/chevron-right.svg";
import { Col, Container, Form, Row } from "react-bootstrap";
import styles from "./css/RegistroInvitado.module.css";

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

        <Row className="d-flex justify-content-center">
          <Col
            xs={10}
            md={10}
            style={{ borderBottom: "1px solid #BFBFBF" }}
          ></Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col xs={12} md={4}>
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu email" />
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
              {/* Formulario del lado derecho */}
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
