import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateProductoDto } from "../interface/CreateProductoDTO";
import styles from "./css/Catalogo.module.css";
import { addToCart } from "../states/cartSlice";
import { useDispatch } from "react-redux";

export const CatalogoProductos = () => {
  const [productos, setProductos] = useState<CreateProductoDto[]>([]);
  const dispatch = useDispatch();
  // const carritoButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function getProductos() {
      try {
        const response = await fetch("/api/producto");

        if (!response.ok) {
          console.log("No pudimos obtener los productos");
        }
        const productosJson = await response.json();
        console.log(productosJson);
        setProductos(productosJson);
      } catch {
        console.log("Ocurrio un error al obtener los productos");
      }
    }

    getProductos();
  }, []);

  const handleAddToCart = (producto: CreateProductoDto) => {
    dispatch(addToCart({ ...producto, stock: 1 }));
    // if (carritoButtonRef.current) {
    //   carritoButtonRef.current.click();
    // }
  };

  return (
    <>
      <div className={styles.catalogoContainer}>
        <div className={styles.productoContainer}>
          {productos.map((producto) => (
            <div key={producto.id} className={styles.cardProducto}>
              <img
                src={producto.imagenes[0]}
                alt={producto.nombre}
                width="150"
              />
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
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
      <button
        // ref={carritoButtonRef}
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasCarrito"
        aria-controls="offcanvasCarrito"
        style={{ display: "none" }}
      ></button>
    </>
  );
};
