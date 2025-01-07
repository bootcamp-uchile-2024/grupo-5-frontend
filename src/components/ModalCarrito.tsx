import "./css/ModalCarrito.css";
import trash from "../assets/icons/trash.svg";
import plus from "../assets/icons/plus.svg";
import truck from "../assets/icons/truck.svg";
import CarritoVacio from "../assets/Carrito/Carro_vacio.png";
import { removeFromCart, updateQuantity } from "../states/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { Offcanvas, Button, Carousel, Card, Row, Col } from "react-bootstrap";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import { setFromModalCarrito } from "../states/navigationSlice";

export const ModalCarrito = forwardRef((_props, ref) => {
  const cart = useSelector((state: RootState) => state.cart.productos);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuario = useSelector((state: RootState) => state.user) as {
    idUsuario: number;
  };
  const navigate = useNavigate();
  const prevCartRef = useRef(cart);

  useImperativeHandle(ref, () => ({
    openModal: handleShow,
  }));

  const handleIncrease = (id: number) => {
    dispatch(updateQuantity({ id, cantidad: 1 }));
  };

  const handleDecrease = (id: number) => {
    dispatch(updateQuantity({ id, cantidad: -1 }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const total = cart.reduce(
    (acc, producto) => acc + producto.precioProducto * producto.stockProducto,
    0
  );

  const handleCompare = () => {
    dispatch(setFromModalCarrito(true));
  };

  const handleNavigate = () => {
    if (usuario.idUsuario !== 0) {
      navigate("/direccion");
    } else {
      navigate("/login");
    }
  };

  const handleNavigateAndCompare = () => {
    handleCompare();
    handleNavigate();
  };

  useEffect(() => {
    const prevCart = prevCartRef.current;
    if (cart.length > prevCart.length) {
      const newProduct = cart.find(
        (producto) =>
          !prevCart.some((prevProducto) => prevProducto.id === producto.id)
      );
      if (newProduct) {
        handleShow();
      }
    }
    prevCartRef.current = cart;
  }, [cart]);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "500px" }}
      >
        <Offcanvas.Header style={{ backgroundColor: "#05C7F2" }}>
          <Button
            variant="link"
            onClick={handleClose}
            aria-label="Close"
            className="btn-close-custom"
          >
            <span aria-hidden="true" className="no-underline">
              X
            </span>
          </Button>
          <Offcanvas.Title
            className="mx-auto"
            style={{
              color: "white",
            }}
          >
            Carrito de Compras
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>¡El carrito está vacío!</p>
              <img src={CarritoVacio} alt="Carrito vacío" />
            </div>
          ) : (
            cart.map((producto) => (
              <Card key={producto.id} className="mb-3">
                <Row>
                  <Col md={4}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      {producto.imagenesProducto &&
                      producto.imagenesProducto.length > 0 ? (
                        <Carousel
                          slide={false}
                          controls={false}
                          indicators={false}
                        >
                          {producto.imagenesProducto.map((imagen, index) => (
                            <Carousel.Item key={index}>
                              <img
                                style={{
                                  width: "110px",
                                  height: "120px",
                                  paddingLeft: "20px",
                                }}
                                src={imagen.pathImagenProducto}
                                className="d-block img-fluid"
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
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title
                        style={{
                          color: "#363636",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "500",
                        }}
                      >
                        {producto.nombreProducto}
                      </Card.Title>
                      <Card.Text
                        style={{
                          color: "#363636",
                          fontSize: "24px",
                          fontFamily: "Montserrat",
                          fontWeight: "700",
                        }}
                      >
                        <span>
                          {formatPrice(
                            producto.precioProducto * producto.stockProducto
                          )}
                        </span>
                      </Card.Text>
                      <div className="d-flex justify-content-end align-items-center">
                        <div className="button-container">
                          <Button
                            size="sm"
                            className="btn-trash"
                            style={{
                              backgroundColor: "transparent",
                              borderColor: "transparent",
                              color: "inherit",
                              boxShadow: "none",
                            }}
                            onClick={() => {
                              if (producto.stockProducto > 1) {
                                handleDecrease(producto.id);
                              } else {
                                handleRemove(producto.id);
                              }
                            }}
                          >
                            <img src={trash} alt="trash" />
                          </Button>
                          <span className="mx-2">{producto.stockProducto}</span>
                          <Button
                            size="sm"
                            className="btn-plus"
                            style={{
                              backgroundColor: "transparent",
                              borderColor: "transparent",
                              color: "inherit",
                              boxShadow: "none",
                            }}
                            onClick={() => handleIncrease(producto.id)}
                          >
                            <img src={plus} alt="Aumentar-producto" />
                          </Button>
                        </div>
                        <Button
                          className="btn-detalle"
                          style={{
                            backgroundColor: "white",
                            width: "113px",
                            height: "40px",
                            padding: "16",
                            borderRadius: "32px",
                            marginLeft: "10px",
                            marginTop: " 20px",
                            color: "#363636",
                            fontSize: "16px",
                            fontFamily: "Montserrat",
                            fontWeight: "500",
                            border: "1px solid #FFC71D",
                          }}
                        >
                          Comparar
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))
          )}
        </Offcanvas.Body>
        {cart.length > 0 && (
          <div>
            <Row className="justify-content-center">
              <Col
                xs={6}
                style={{
                  backgroundColor: "#EEF8FD",
                  width: "250px",
                  height: " 79px",
                }}
              >
                <h5 className="titulo_total">TOTAL</h5>
                <p className="texto_total">${total}</p>
              </Col>
              <Col
                xs={6}
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#05C7F2",
                  width: "250px",
                  height: " 79px",
                }}
              >
                <button
                  onClick={handleNavigateAndCompare}
                  className="link-custom"
                >
                  Ir a Comprar
                </button>
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col xs="auto" className="text-center">
                <div className="envio-gratis-container">
                  <img src={truck} alt="Envío gratis" />
                  <p className="mb-0 ms-2 text_envio">Envío gratis</p>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Offcanvas>
    </>
  );
});
