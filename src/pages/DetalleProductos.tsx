import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CreateProductoDto } from "../interface/CreateProductoDTO";
import styles from "./css/DetalleProductos.module.css";
// import { addToCart, updateQuantity } from "../states/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../states/store";
import { MainLayout } from "../layout/MainLayout";

export const DetalleProductos = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<CreateProductoDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity] = useState<number>(1);
  // const dispatch = useDispatch();
  // const cart = useSelector((state: RootState) => state.cart.productos);

  useEffect(() => {
    const getProducto = async () => {
      try {
        if (!id) return;

        const response = await fetch(`/api/producto/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const productoJson = await response.json();
        setProducto(productoJson);
      } catch (error: unknown) {
        console.log("Ocurrió un error al obtener el producto:", error);
        setError(`Error al obtener el producto: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    getProducto();
  }, [id]);

  // const handleIncrease = () => {
  //   setQuantity((prevQuantity) => prevQuantity + 1);
  // };

  // const handleDecrease = () => {
  //   setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  // };

  // const handleAddToCart = () => {
  //   if (producto) {
  //     const existingItem = cart.find((item) => item.id === producto.id);
  //     if (existingItem) {
  //       dispatch(updateQuantity({ id: producto.id, cantidad: quantity }));
  //     } else {
  //       dispatch(addToCart({ ...producto, stock: quantity }));
  //     }
  //   }
  // };

  if (loading) return <div>Cargando producto...</div>; // Mostrar loading
  if (error) return <div>{error}</div>; // Mostrar error si ocurre

  return (
    <MainLayout>
      <div className={styles.detalleProductoContainer}>
        {producto && (
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={producto.imagenes[0]}
                  className="img-fluid rounded-start"
                  alt={producto.nombre}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">
                    Precio: ${producto.precio * quantity}
                  </p>
                  <p className="card-text">Marca: {producto.marca}</p>
                  <p className="card-text">Categoría: {producto.categoria}</p>
                  <p className="card-text">Stock: {producto.stock}</p>
                  <p className="card-text">Detalle: {producto.descripcion}</p>
                  {/* <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={handleDecrease}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="btn btn-outline-secondary ms-2"
                      onClick={handleIncrease}
                    >
                      +
                    </button>
                  </div> */}
                  <div className="botones-container mt-2">
                    {/* <button
                      className="btn btn-primary"
                      onClick={handleAddToCart}
                    >
                      Añadir al carrito
                    </button> */}
                    <Link to="/" className="btn btn-secondary ms-2">
                      Volver al Catálogo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
