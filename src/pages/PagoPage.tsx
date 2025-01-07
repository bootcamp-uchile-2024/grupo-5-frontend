import { Button, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";
import styles from "./css/PagoPage.module.css";
import "./css/PagoPage.css";
import ShoppingCart from "../assets/icons/shopping-cart.svg";
import Location from "../assets/icons/Location_blue.svg";
import Caja from "../assets/icons/Caja.svg";
import Pago from "../assets/icons/pago_white.svg";
import Chevron from "../assets/icons/chevron-right.svg";
import Transbank from "../assets/icons/transbank.svg";
import MercadoPago from "../assets/icons/mercadopago.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalPago } from "../components/ModalPago";
import { formatPrice } from "../utils/formatPrice";
import { clearCartAndLocalStorage, enviarPedido } from "../states/cartSlice";

export const PagoPage = () => {
  const [selectedPago, setSelectedPago] = useState<string | null>(null);
  const cart = useSelector((state: RootState) => state.cart.productos);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const total = cart.reduce(
    (acc, producto) => acc + producto.precioProducto,
    0
  );

  const handlePago = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPago(event.target.id);
  };

  const handleCheckout = () => {
    dispatch(enviarPedido());
  };

  const handleButtonClick = () => {
    handlePagarClick();
    handleCheckout();
  };

  const handlePagarClick = () => {
    if (selectedPago) {
      setShowModal(true);
      dispatch(clearCartAndLocalStorage());
      setTimeout(() => {
        navigate("/");
      }, 10000);
    }
  };

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

        <Row className="d-flex justify-content-center mt-5 pt-5">
          <Col xs={12} md={5} className="d-flex justify-content-center">
            <div className={styles.formContainer}>
              <p className={styles.parrafo1}>Selecciona tu método de pago</p>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Check
                    style={{
                      borderBottom: "1px solid #808080",
                      paddingBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    type="radio"
                    label={
                      <img
                        src={Transbank}
                        alt="Descripción de la imagen"
                        style={{ width: "150px", height: "79px" }}
                      />
                    }
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    onChange={handlePago}
                  />
                  <Form.Check
                    style={{
                      borderBottom: "1px solid #808080",
                      paddingBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    type="radio"
                    label={
                      <img
                        src={MercadoPago}
                        alt="Descripción de la imagen"
                        style={{ width: "150px", height: "79px" }}
                      />
                    }
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    onChange={handlePago}
                  />
                </Form.Group>
              </Form>
            </div>
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-end">
            <div className={styles.containerResumen}>
              <div className={styles.container1}>
                <p className={styles.resumen}>Resumen de tu compra</p>
                {cart.map((producto) => (
                  <div key={producto.id} className={styles.producto}>
                    <Carousel slide={false} indicators={false}>
                      {producto.imagenesProducto.map((imagen, index) => (
                        <Carousel.Item key={index}>
                          <img
                            src={imagen.pathImagenProducto}
                            alt={`${producto.nombreProducto} imagen ${
                              index + 1
                            }`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    <div className={styles.detalle}>
                      <p className={styles.nombre}>{producto.nombreProducto}</p>
                    </div>
                    <div className={styles.detalle}>
                      <p className={styles.precio}>
                        {formatPrice(producto.precioProducto)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.container2}>
                <div className={styles.containerTotal}>
                  <p className={styles.total}>Total</p>
                  <p className={styles.precio}>{formatPrice(total)}</p>
                </div>
                <div className={styles.containerEnvio}>
                  <p className={styles.envio}>Envío </p>
                  <p className={styles.gratis}>Gratis</p>
                </div>
              </div>
              <div className={styles.container3}>
                <div className={styles.containerTotal}>
                  <p className={styles.totalTitulo}>Total</p>
                  <p className={styles.resumen}>{formatPrice(total)}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center pb-5">
          <Col xs={12} className="d-flex justify-content-center mt-5 pb-5">
            <Button
              type="submit"
              variant="warning"
              style={{
                width: "178px",
                height: "56px",
                borderRadius: "32px",
                color: "#363636",
                fontSize: "24px",
                fontFamily: "Montserrat",
                fontWeight: "700",
                marginTop: "10px",
              }}
              onClick={handleButtonClick}
              disabled={!selectedPago}
            >
              Pagar
            </Button>
          </Col>
        </Row>
      </Container>
      <ModalPago show={showModal} onHide={() => setShowModal(false)} />
    </MainLayout>
  );
};
