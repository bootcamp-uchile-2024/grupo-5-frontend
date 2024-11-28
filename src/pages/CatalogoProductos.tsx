import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CatalogoProductoDto } from "../interface/Productos/read-catalogo-productos.dto";
import styles from "./css/Catalogo.module.css";
import { addToCart } from "../states/cartSlice";
import { useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { Row, Col } from "react-bootstrap";

export const CatalogoProductos = () => {
  const [productos, setProductos] = useState<CatalogoProductoDto[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProductos() {
      try {
        const response = await fetch("/api/productos", {
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
    dispatch(addToCart({ ...producto, stock: 1 }));
  };

  // Divide los productos en grupos de 3 para cada slide del carousel
  const chunkSize = 3;
  const productChunks = [];
  for (let i = 0; i < productos.length; i += chunkSize) {
    productChunks.push(productos.slice(i, i + chunkSize));
  }

  return (
    <div className={styles.catalogoContainer}>
      <Carousel>
        {productChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {chunk.map((producto) => (
                <Col xs={12} sm={6} md={4} key={producto.id} className="mb-3">
                  <div className={styles.cardProducto}>
                    {producto.ImagenesProducto &&
                    producto.ImagenesProducto.length > 0 ? (
                      <Carousel slide={false}>
                        {producto.ImagenesProducto.map((imagen, index) => (
                          <Carousel.Item key={index}>
                            <img
                              src={imagen.pathImagenProducto}
                              className="d-block w-100"
                              alt={`${producto.NombreProducto} imagen ${index + 1}`}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    ) : (
                      <p>Imagen no disponible</p>
                    )}
                    <h3>{producto.NombreProducto}</h3>
                    <p>Precio: ${producto.PrecioProducto}</p>
                    <button type="button" onClick={() => handleAddToCart(producto)}>
                      Añadir al carrito
                    </button>
                    <button className="btn-detalle">
                      <Link
                        to={`/detalle-productos/${producto.id}`}
                        className={styles.linkDetalle}
                      >
                        Ver Detalle
                      </Link>
                    </button>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};