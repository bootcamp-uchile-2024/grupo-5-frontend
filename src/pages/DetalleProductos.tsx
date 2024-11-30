import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../states/cartSlice";
import { GetProductoDto } from "../interface/Productos/read-producto.dto";
import styles from "./css/DetalleProductos.module.css";
import { MainLayout } from "../layout/MainLayout";
import addIcon from "../assets/icons/icono_carrito.svg";
import carouselImage from "../assets/Carousels/Carousels2.png";
import {
  Carousel,
  Col,
  Container,
  Row,
  Accordion,
  Button,
} from "react-bootstrap";
import { CatalogoProductos } from "./CatalogoProductos";

export const DetalleProductos = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<GetProductoDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducto = async () => {
      try {
        if (!id) return;
        const response = await fetch(`/api/productos/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducto(data[0]);
        } else {
          throw new Error("Producto no encontrado");
        }
      } catch (error: any) {
        console.log("Ocurrió un error al obtener el producto:", error);
        setError(`Error al obtener el producto: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getProducto();
  }, [id]);

  const handleAddToCart = (producto: GetProductoDto) => {
    if (producto) {
      dispatch(
        addToCart({
          ...producto,
          stock: 1,
          NombreProducto: "",
          MarcaProducto: "",
          PrecioProducto: 0,
          ImagenesProducto: [],
        })
      );
    }
  };

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;

  return (
    <MainLayout>
      <Container fluid>
        <Row className="mb-5 pt-5">
          <Link to="/" className={styles.linkVolver}>
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
        {producto && (
          <Row className="d-flex justify-content-center align-items-center">
            <Col xs={2} sm={3} md={3} className={styles.productoIzquierda}>
              {producto.imagenes && producto.imagenes.length > 0 ? (
                <Carousel
                  slide={false}
                  indicators={false}
                  prevIcon={
                    <span
                      aria-hidden="true"
                      className="carousel-control-prev-icon"
                      style={{
                        width: "40px",
                        height: "40px",
                        filter: "invert(1)",
                      }}
                    />
                  }
                  nextIcon={
                    <span
                      aria-hidden="true"
                      className="carousel-control-next-icon"
                      style={{
                        width: "40px",
                        height: "40px",
                        filter: "invert(1)",
                      }}
                    />
                  }
                  style={{
                    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.199)",
                    borderRadius: "32px",
                  }}
                >
                  {producto.imagenes.map((imagen, index) => (
                    <Carousel.Item
                      key={index}
                      className="d-flex justify-content-center "
                    >
                      <img
                        src={imagen.pathImagenProducto}
                        className={`${styles.productoImagen} d-block`}
                        alt={`${producto.nombreProducto} imagen ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <p>Imagen no disponible</p>
              )}
            </Col>
            <Col xs={3} sm={3} md={3} className={styles.productoDerecha}>
              <p className={styles.productoNombre}>{producto.nombreProducto}</p>
              <p className={styles.productoMarca}>{producto.marca}</p>
              <p className={styles.productoPrecio}>${producto.precio}</p>
            </Col>
            <Col xs={3} sm={3} md={3}>
              <div className="d-flex flex-column align-items-end">
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
                    marginBottom: "16px",
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
                  className="btn-detalle mt-2"
                  style={{
                    backgroundColor: "white",
                    width: "124px",
                    height: "44px",
                    padding: "12",
                    borderRadius: "32px",
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
            </Col>
            <Col xs={3} sm={3} md={9}>
              <Accordion
                style={{
                  paddingTop: "20px",
                  paddingBottom: "40px",
                }}
              >
                <Accordion.Item
                  eventKey="0"
                  style={{
                    borderRadius: "32px",
                    padding: "20px",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  <Accordion.Header>
                    <span className="fs-4">Descripción</span>
                  </Accordion.Header>
                  <Accordion.Body>{producto.descripcion}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Row className="justify-content-center mb-5">
              <Col xs={3} sm={3} md={9}>
                <Carousel
                  prevIcon={
                    <span
                      aria-hidden="true"
                      className="carousel-control-prev-icon"
                      style={{
                        width: "66px",
                        height: "66px",
                        marginLeft: "-90px",
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
                        marginRight: "-90px",
                      }}
                    />
                  }
                >
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={carouselImage}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={carouselImage}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={3} sm={3} md={6}>
                <h1 className={styles.titulo}>Recomendados para ti</h1>
              </Col>
              <Col xs={3} sm={3} md={10} className="justify-content-center">
                <CatalogoProductos />
              </Col>
            </Row>
          </Row>
        )}
      </Container>
    </MainLayout>
  );
};
