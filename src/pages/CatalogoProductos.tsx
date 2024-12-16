import { useEffect, useState } from "react";
import { CatalogoProductoDto } from "../interface/Productos/dto/CatalogoProductoDto";
import styles from "./css/Catalogo.module.css";
import { addToCart } from "../states/cartSlice";
import { useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import addIcon from "../assets/icons/icono_carrito.svg";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

export const CatalogoProductos = () => {
  const [productos, setProductos] = useState<CatalogoProductoDto[]>([]);
  const dispatch = useDispatch();

  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    throw new Error(
      "La URL de la API no está definida en las variables de entorno"
    );
  }

  useEffect(() => {
    async function getProductos() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/productos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("No pudimos obtener los productos");
          return;
        }

        const productosJson = await response.json();
        console.log(productosJson);
        setProductos(productosJson);
      } catch (error) {
        console.log("Ocurrio un error al obtener los productos", error);
      }
    }

    getProductos();
  }, []);

  const handleAddToCart = (producto: CatalogoProductoDto) => {
    dispatch(addToCart({ ...producto, stockProducto: 1 }));
  };

  const chunkSize = 4;
  const productChunks = [];
  for (let i = 0; i < productos.length; i += chunkSize) {
    productChunks.push(productos.slice(i, i + chunkSize));
  }

  return (
    <Container fluid>
      <Carousel
        indicators={false}
        prevIcon={
          <span
            aria-hidden="true"
            className="carousel-control-prev-icon"
            style={{
              width: "66px",
              height: "66px",
              filter: "invert(1)",
            }}
          />
        }
        nextIcon={
          <span
            aria-hidden="true"
            className="carousel-control-next-icon"
            style={{
              width: "66px",
              height: "66px",
              filter: "invert(1)",
            }}
          />
        }
      >
        {productChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {chunk.map((producto) => (
                <Col
                  xs={12}
                  sm={6}
                  md={3}
                  lg={2}
                  key={producto.id}
                  className="mb-3 img-fluid mx-4"
                >
                  <div className={styles.cardProducto}>
                    <div className={styles.imgContainer}>
                      {producto.imagenesProducto &&
                      producto.imagenesProducto.length > 0 ? (
                        <Carousel
                          slide={false}
                          controls={false}
                          indicators={false}
                        >
                          {producto.imagenesProducto.map((imagen, index) => (
                            <Carousel.Item key={index}>
                              <Link to={`/detalle-productos/${producto.id}`}>
                                <img
                                  src={imagen.pathImagenProducto}
                                  className="d-block img-fluid"
                                  alt={`${producto.nombreProducto} imagen ${
                                    index + 1
                                  }`}
                                />
                              </Link>
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      ) : (
                        <p>Imagen no disponible</p>
                      )}
                    </div>
                    <p className={styles.nom_producto}>
                      {producto.nombreProducto}
                    </p>
                    <p className={styles.nom_precio}>
                      <span>{formatPrice(producto.precioProducto)}</span>
                    </p>
                    <div className={styles.buttonContainer}>
                      <Button
                        style={{
                          backgroundColor: "#F2B705",
                          width: "124px",
                          height: "44px",
                          padding: "12",
                          borderRadius: "32px",
                          color: "#222222",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "700",
                          border: "1px solid #FFC71D",
                        }}
                        onClick={() => handleAddToCart(producto)}
                      >
                        Añadir
                        <img
                          src={addIcon}
                          alt="Añadir"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginLeft: "8px",
                          }}
                        />
                      </Button>
                      <Button
                        className="btn-detalle"
                        style={{
                          backgroundColor: "white",
                          width: "124px",
                          height: "44px",
                          padding: "12",
                          borderRadius: "32px",
                          marginTop: "8px",
                          color: "#363636",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "700",
                          border: "1px solid #FFC71D",
                        }}
                      >
                        Comparar
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};
