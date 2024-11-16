import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../states/cartSlice";
import { GetProductoDto } from "../interface/Productos/read-producto.dto";
import styles from "./css/DetalleProductos.module.css";
import { MainLayout } from "../layout/MainLayout";
import { Carousel } from "react-bootstrap";

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
          setProducto(data[0]); // Accede al primer elemento del array
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

  const handleAddToCart = () => {
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

  if (loading) return <div>Cargando producto...</div>; // Mostrar loading
  if (error) return <div>{error}</div>; // Mostrar error si ocurre

  return (
    <MainLayout>
      <div className={styles.detalleProductoContainer}>
        <h1 className={styles.tituloPrincipal}>Detalle del producto</h1>
        {producto && (
          <div className={styles.productoCard}>
            <div className={styles.productoIzquierda}>
              {producto.imagenes && producto.imagenes.length > 0 ? (
                <Carousel slide={false}>
                  {producto.imagenes.map((imagen, index) => (
                    <Carousel.Item key={index}>
                      <img
                        src={imagen.pathImagenProducto}
                        className={styles.productoImagen}
                        alt={`${producto.nombreProducto} imagen ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <p>Imagen no disponible</p>
              )}
            </div>
            <div className={styles.productoDerecha}>
              <h3 className={styles.productoNombre}>
                {producto.nombreProducto}
              </h3>
              <p className={styles.productoMarca}>Marca: {producto.marca}</p>
              <p className={styles.productoCategoria}>
                Categoría: {producto.categoria}
              </p>
              <p className={styles.productoPrecio}>
                Precio: ${producto.precio}
              </p>
              <p className={styles.productoStock}>Stock: {producto.stock}</p>
              <p className={styles.productoDescripcion}>
                Descripción: {producto.descripcion}
              </p>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Añadir al carrito
              </button>
              <Link to="/" className="btn btn-secondary mt-2">
                Volver a la página principal
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
