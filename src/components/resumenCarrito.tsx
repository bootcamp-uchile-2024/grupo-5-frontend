import "./css/ResumenCarrito.css";
import { removeFromCart, updateQuantity } from "../states/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import img from "../assets/shopping-cart.svg";

export const ResumenCarrito = () => {
  const cart = useSelector((state: RootState) => state.cart.productos);
  const dispatch = useDispatch();

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
    (acc, producto) => acc + producto.precio * producto.stock,
    0
  );

  return (
    <div className="resumen-carrito">
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h4>¡Tu carrito está vacío!</h4>
          <img src={img} alt="Icon-Carrito" />
          <Link to="/" className="btn btn-primary mt-2">
            Volver
          </Link>
        </div>
      ) : (
        <>
          <h4>Resumen del Carrito</h4>
          <div className="cart-total sticky-top d-flex justify-content-between align-items-center">
            <div className="total-amount">
              <h5>Total</h5>
              <p>${total}</p>
            </div>
            <Link to="/" className="btn btn-primary mt-2">
              Volver
            </Link>
          </div>
          <div className="cart-items">
            {cart.map((producto) => (
              <div key={producto.id} className="card mb-3">
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
                        Precio: ${producto.precio * producto.stock}
                      </p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary me-2"
                          onClick={() => handleDecrease(producto.id)}
                        >
                          -
                        </button>
                        <span>{producto.stock}</span>
                        <button
                          className="btn btn-outline-secondary ms-2"
                          onClick={() => handleIncrease(producto.id)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleRemove(producto.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
