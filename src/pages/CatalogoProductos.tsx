import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CatalogoProductoDto } from "../interface/Productos/read-catalogo-productos.dto";
import styles from "./css/Catalogo.module.css";
import { addToCart } from "../states/cartSlice";
import { useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";

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

  return (
    <>
      <div className={styles.catalogoContainer}>
        <div className={styles.productoContainer}>
          {productos.map((producto) => (
            <div key={producto.id} className={styles.cardProducto}>
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
          ))}
        </div>
      </div>
    </>
  );
};
