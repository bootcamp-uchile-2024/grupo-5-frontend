import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CreateProductoDto } from "../interface/CreateProductoDTO";
import styles from "./css/DetalleProductos.module.css";

export const DetalleProductos = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<CreateProductoDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducto = async () => {
      try {
        if (!id) return;

        const response = await fetch(`/api/productos/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const responseText = await response.text();
        console.log("Raw response:", responseText);

        try {
          const productoJson = JSON.parse(responseText);
          setProducto(productoJson);
        } catch (jsonError) {
          if (jsonError instanceof Error) {
            throw new Error(`Error parsing JSON: ${jsonError.message}`);
          } else {
            throw new Error("Error parsing JSON: Unknown error");
          }
        }
      } catch (error: unknown) {
        console.log("Ocurrió un error al obtener el producto:", error);
        setError(`Error al obtener el producto: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    getProducto();
  }, [id]);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1 className= {styles.tituloPrincipal}>Detalle del producto</h1>
      {producto && (
        <div className= {styles.productoCard}>
          <div className= {styles.productoIzquierda}>
            <img
              src={producto.imagenes[0]}
              alt={producto.nombre}
              className= {styles.productoImagen}
            />
          </div>
          <div className= {styles.productoDerecha}>
            <h4 className={styles.productoNombre}>{producto.nombre}</h4>
            <p className= {styles.productoPrecio}>Precio: ${producto.precio}</p>
            <p className= {styles.productoMarca}>Marca: {producto.marca}</p>
            <p className= {styles.productoCategoria}>
              Categoría: {producto.categoria}
            </p>
            <p className= {styles.productoStock}>Stock: {producto.stock}</p>
            <p className= {styles.productoDescripcion}>
              Detalle: {producto.descripcion}
            </p>
            <div className="botones-container">
              <button className="btn-detalle">
                <Link to="/catalogo-productos">Volver al Catálogo</Link>
              </button>
              <button className="btn-detalle">Comprar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
