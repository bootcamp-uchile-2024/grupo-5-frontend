import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateProductoDto } from "../interface/CreateProductoDTO";
import styles from "./css/Catalogo.module.css";
import { addToCart } from "../states/cartSlice";
import { useDispatch } from "react-redux";

export const CatalogoProductos = () => {
  const [productos, setProductos] = useState<CreateProductoDto[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProductos() {
      try {
        const response = await fetch("http://localhost:5001/api/producto", {
          method: "POST",
          mode: 'no-cors',
          headers: {
            "Content-Type": "application/json",
            credentials: 'include',
          },
          body: JSON.stringify({
            nombre: "Producto de prueba",
            descripcion: "Este es un producto de prueba",
            precio: 100,
            imagenes: ["url_imagen_producto"],
            stock: 10
          }),
        });

        if (!response.ok) {
          console.log("No pudimos obtener los productos");
          return;
        }

        const productosJson = await response.json();
        console.log("Productos recibidos:", productosJson);

        setProductos(productosJson);
      } catch (error) {
        console.log("Ocurrió un error al obtener los productos:", error);
      }
    }

    getProductos();
  }, []);

  const handleAddToCart = (producto: CreateProductoDto) => {
    dispatch(addToCart({ ...producto, stock: 1 }));
  };

  return (
    <>
      <div className={styles.catalogoContainer}>
        <div className={styles.productoContainer}>
          {productos.length === 0 ? (
            <p>No pudimos obtener los productos</p>
          ) : (
            productos.map((producto) => (
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
            ))
          )}
        </div>
      </div>
      <button
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
