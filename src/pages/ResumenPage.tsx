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
import { useEffect, useState } from "react";
import { ModalMisDirecciones } from "../components/Direccion/MisDirecciones";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModalEditarDireccion } from "../components/Direccion/EditarDireccion";

export const ResumenPage = () => {
  const location = useLocation();
  const [selectedDireccion, setSelectedDireccion] = useState(
    location.state?.selectedDireccion || null
  );
  const userData = location.state || {};
  const [comunaNombre, setComunaNombre] = useState("");
  const [showMisDireccionesModal, setShowMisDireccionesModal] = useState(false);
  const [showEditarDireccionModal, setShowEditarDireccionModal] =
    useState(false);

  const source = location.state?.source;
  const isLoggedIn = useSelector((state: RootState) => state.user.idUsuario !== 0);

  useEffect(() => {
    const fetchComunaNombre = async (idComuna: number) => {
      try {
        const response = await fetch(
          `http://107.21.145.167:5001/comuna/${idComuna}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setComunaNombre(data.nombreComuna);
      } catch (error) {
        console.error("Error al obtener la comuna:", error);
      }
    };

    if (userData && userData.comuna) {
      fetchComunaNombre(userData.comuna);
    }
  }, [userData]);

  const handleShowMisDireccionesModal = () => setShowMisDireccionesModal(true);
  const handleCloseMisDireccionesModal = () =>
    setShowMisDireccionesModal(false);

  const handleShowEditarDireccionModal = () =>
    setShowEditarDireccionModal(true);
  const handleCloseEditarDireccionModal = () =>
    setShowEditarDireccionModal(false);

  const handleDireccionSelect = (direccion: any) => {
    setSelectedDireccion(direccion);
  };

  const cart = useSelector((state: RootState) => state.cart.productos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, producto) => acc + producto.precioProducto * producto.stockProducto,
    0
  );

  const getFormattedDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return today.toLocaleDateString("es-ES", options);
  };

  return (
    <MainLayout>
      <Container className="mt-3" fluid>
        <Row className="mb-5 pt-5">
          <Link
            to={
              source === "RegistroInvitado"
                ? "/registro-invitado"
                : "/direccion"
            }
            className={styles.linkVolver}
          >
            <span
              aria-hidden="true"
              className="carousel-control-prev-icon"
              style={{
                width: "24px",
                height: "24px",
                filter: "invert(1)",
                marginRight: "8px",
                marginLeft: "30px",
              }}
            />
            Volver
          </Link>
        </Row>
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
                {source === "DireccionPage" && selectedDireccion ? (
                  <div>
                    <p
                      className={styles.direccionTitle}
                    >{`${selectedDireccion.calle} ${selectedDireccion.numero}`}</p>
                    <p className={styles.comunaText}>
                      {selectedDireccion.comuna.nombreComuna}
                    </p>
                  </div>
                ) : source === "RegistroInvitado" && userData ? (
                  <div>
                    <p
                      className={styles.direccionTitle}
                    >{`${userData.direccion} ${userData.numero}`}</p>
                    <p className={styles.comunaText}>{comunaNombre}</p>
                  </div>
                ) : (
                  <p>No hay datos disponibles.</p>
                )}
                <img
                  src={Pencil}
                  alt="editar"
                  style={{
                    cursor: "pointer",
                    paddingLeft: "10px",
                  }}
                  onClick={
                    source === "DireccionPage"
                      ? handleShowMisDireccionesModal
                      : handleShowEditarDireccionModal
                  }
                />
              </div>
              <div className={styles.contenedorFecha}>
                <p className={styles.fechaText}>Fecha estimada de entrega:</p>
                <p className={styles.fecha}>{getFormattedDate()}</p>
                <p className={styles.hora}>entre 09:00 a 21:00 hrs.</p>
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
                  marginTop: "70px",
                }}
                onClick={() => navigate("/pago")}
              >
                Pagar
              </Button>
            </div>
          </Col>
          <ModalMisDirecciones
            show={showMisDireccionesModal}
            onHide={handleCloseMisDireccionesModal}
            onDireccionSelect={handleDireccionSelect}
          />
          <ModalEditarDireccion
            show={showEditarDireccionModal}
            onHide={handleCloseEditarDireccionModal}
            direccion={selectedDireccion}
            onSuccess={() => {}}
            source={source}
            userData={userData}
          />
        </Row>
        {!isLoggedIn && (
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
        )}
      </Container>
    </MainLayout>
  );
};
