import { Col, Container, Form, Row } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";
import styles from "./css/PagoPage.module.css";
import ShoppingCart from "../assets/icons/shopping-cart.svg";
import Location from "../assets/icons/Location_blue.svg";
import Caja from "../assets/icons/Caja.svg";
import Pago from "../assets/icons/pago_white.svg";
import Chevron from "../assets/icons/chevron-right.svg";
import Transbank from "../assets/icons/transbank.svg";
import MercadoPago from "../assets/icons/mercadopago.svg";

export const PagoPage = () => {
  return (
    <MainLayout>
      <Container fluid>
        <div className={styles.customContainer}>
          <h1 className={styles.titulo}>Pago</h1>
          <Row className="d-flex justify-content-center">
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center `}
            >
              <div className={styles.icons}>
                <img src={ShoppingCart} alt="shopping-cart-img" />
              </div>
              <span className={styles.iconText}>Carrito de compra</span>
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
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center mb-3`}
            >
              <div className={styles.icons}>
                <img src={Location} alt="Location-img" />
              </div>
              <span className={styles.iconText}>Dirección</span>
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
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center mb-3`}
            >
              <div className={styles.icons}>
                <img src={Caja} alt="Caja-img" />
              </div>
              <span className={styles.iconText}>Resumen</span>
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
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center mb-3`}
            >
              <div className={styles.iconPago}>
                <img src={Pago} alt="Pago-img" />
              </div>
              <span className={styles.iconText}>Pago</span>
            </Col>
          </Row>
        </div>

        <Row className="d-flex justify-content-center mt-5">
          <Col xs={12} md={3} className="d-flex justify-content-center">
            <div className={styles.formContainer}>
              <p className={styles.parrafo1}>Selecciona tu método de pago</p>
              <Form>
                <Form.Group as={Row} className="mb-3">                  
                    <Form.Check
                    style={{borderBottom: '1px solid #808080', paddingBottom: '10px'}}
                      type="radio"
                      label={<span style={{ fontSize: '20px', fontWeight: '700', color: '#535353', paddingLeft: '10px', marginBottom: '10px' }}>Tarjeta de Débito</span>}
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                     style={{borderBottom: '1px solid #808080', paddingBottom: '10px',  paddingTop: '10px'}}
                      type="radio"
                      label={<span style={{ fontSize: '20px', fontWeight: '700', color: '#535353', paddingLeft: '10px', marginBottom: '10px' }}>Tarejta de Crédito</span>}
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                    />
                    <Form.Check
                    style={{borderBottom: '1px solid #808080', paddingBottom: '10px'}}
                      type="radio"
                      label={<img src={Transbank} alt="Descripción de la imagen" style={{ width: '158px', height: '79px', marginBottom: '10px' }}/>}
                      name="formHorizontalRadios"
                      id="formHorizontalRadios3"
                    />
                    <Form.Check
                    style={{borderBottom: '1px solid #808080', paddingBottom: '10px'}}
                      type="radio"
                      label={<img src={MercadoPago} alt="Descripción de la imagen" style={{ width: '158px', height: '79px' }} />}
                      name="formHorizontalRadios"
                      id="formHorizontalRadios3"
                    />
                  
                </Form.Group>
              </Form>
            </div>
          </Col>
          <Col xs={12} md={3} className="d-flex justify-content-center">
            <div>
              <p>Resumen de tu compra</p>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};
