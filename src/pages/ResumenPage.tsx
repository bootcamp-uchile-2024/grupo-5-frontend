import styles from "../pages/css/ResumenPage.module.css";
import ShoppingCart from "../assets/icons/shopping-cart.svg";
import Location from "../assets/icons/Location_blue.svg";
import trash from "../assets/icons/trash.svg";
import plus from "../assets/icons/plus.svg";
import Location2 from "../assets/icons/Location2.svg";
import Caja from "../assets/icons/Caja_white.svg";
import Pago from "../assets/icons/dollar-alt.svg";
import Chevron from "../assets/icons/chevron-right.svg";
import Pencil from "../assets/icons/Pencil.svg";
import Truck from "../assets/icons/truck_white.svg";
import img from "../assets/resumen_perro.png";
import { removeFromCart, updateQuantity } from "../states/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";
import { formatPrice } from "../utils/formatPrice";
import { useState } from "react";
import { ModalForm } from "../components/ModalForm";
import { useNavigate } from "react-router-dom";

export const ResumenPage = () => {
  const cart = useSelector((state: RootState) => state.cart.productos);
  const dispatch = useDispatch();
  const { direccion, numero, comuna } = useSelector(
    (state: RootState) => state.form
  );
  const [modalShow, setModalShow] = useState(false);

  const total = cart.reduce(
    (acc, producto) => acc + producto.precioProducto * producto.stockProducto,
    0
  );

  const navigate = useNavigate();

  return (
    <MainLayout>
      <Container fluid>
        <div className={styles.customContainer}>
          <h1 className={styles.titulo}>Resumen de Compra</h1>
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
              <div className={styles.iconCaja}>
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
              <div className={styles.icons}>
                <img src={Pago} alt="Pago-img" />
              </div>
              <span className={styles.iconText}>Pago</span>
            </Col>
          </Row>
        </div>

        <Row className="d-flex justify-content-center mt-5">
          <Col md={4}>
            <div className="d-flex flex-column">
              {cart.map((producto) => (
                <Card
                  key={producto.id}
                  className="mb-3"
                  style={{
                    width: "441px",
                    height: "175px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "24px",
                    boxShadow: "2px 2px 4px rgba(136, 136, 136, 0.25)",
                    border: "none",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div>
                      {producto.imagenesProducto &&
                      producto.imagenesProducto.length > 0 ? (
                        <Carousel slide={false} indicators={false}>
                          {producto.imagenesProducto.map((imagen, index) => (
                            <Carousel.Item key={index}>
                              <img
                                style={{ width: "110px", height: "120px" }}
                                src={imagen.pathImagenProducto}
                                alt={`${producto.nombreProducto} imagen ${
                                  index + 1
                                }`}
                              />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      ) : (
                        <p>Imagen no disponible</p>
                      )}
                    </div>

                    <div
                      className={`d-flex flex-column mx-2 ${styles.contenedorProducto}`}
                    >
                      <h5 className={styles.cardTitle}>
                        {producto.nombreProducto}
                      </h5>
                      <p className={styles.cardText}>
                        <span>
                          {formatPrice(
                            producto.precioProducto * producto.stockProducto
                          )}
                        </span>
                      </p>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                      <div
                        className={`${styles.buttonContainer} d-flex flex-column align-items-center`}
                      >
                        <Button
                          size="sm"
                          className="btn-plus mb-2"
                          style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            color: "inherit",
                            boxShadow: "none",
                          }}
                          onClick={() =>
                            dispatch(
                              updateQuantity({ id: producto.id, cantidad: 1 })
                            )
                          }
                        >
                          <img src={plus} alt="" />
                        </Button>

                        <span className="mx-2">{producto.stockProducto}</span>

                        <Button
                          size="sm"
                          className="btn-trash mt-2"
                          style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            color: "inherit",
                            boxShadow: "none",
                          }}
                          onClick={() => {
                            if (producto.stockProducto > 1) {
                              dispatch(
                                updateQuantity({
                                  id: producto.id,
                                  cantidad: -1,
                                })
                              );
                            } else {
                              dispatch(removeFromCart(producto.id));
                            }
                          }}
                        >
                          <img src={trash} alt="trash" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Col>
          <Col
            md={3}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            <div className={styles.contenedorSection}>
              <div className={styles.contenedor}>
                <img src={Location2} alt="Location2" />
                <div>
                  <p
                    className={styles.direccionTitle}
                  >{`${direccion} ${numero}`}</p>
                  <p className={styles.comunaText}>{comuna}</p>
                </div>
                <img
                  src={Pencil}
                  alt="editar"
                  style={{
                    cursor: "pointer",
                    paddingLeft: "10px",
                  }}
                  onClick={() => setModalShow(true)}
                />
              </div>
              <div className={styles.contenedorPrecio}>
                <p className={styles.totalText}>TOTAL {formatPrice(total)}</p>
              </div>
              <div className={styles.contenedorTruck}>
                <img src={Truck} alt="Truck" />
                <p className={styles.envioText}>Envío gratis</p>
              </div>
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
                onClick={() => navigate("/pago")}
              >
                Pagar
              </Button>
            </div>
          </Col>
          <ModalForm show={modalShow} onHide={() => setModalShow(false)} />
        </Row>
        <Row
          className="d-flex justify-content-center"
          style={{ paddingTop: "100px", paddingBottom: "70px" }}
        >
          <Col md={9} className="d-flex justify-content-center">
            <div className={styles.contenedorFooter}>
              <div className={styles.contenedorParafo}>
                <p className={styles.parrafo2}>
                  ¡Tus compras, siempre a un clic de distancia!
                </p>
                <p className={styles.parrafo5}>
                  Al registrarte, podrás ver tu historial de pedidos y repetir
                  tus compras favoritas en segundos. Haz tus próximas compras
                  aún más rápidas y cómodas.
                </p>
              </div>
              <Col md={1}>
                <Button
                  style={{
                    backgroundColor: "#7FD54D",
                    color: "#363636",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    borderRadius: "32px",
                    width: "197px",
                    height: "40px",
                    border: "none",
                  }}
                  onClick={() => navigate("/registro")}
                >
                  Registrarme
                </Button>
              </Col>
              <Col md={4}>
                <div className={styles.imgPerro}>
                  <img src={img} alt="Perro" />
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};
