import "./css/ModalCarrito.css";
import img from "../assets/shopping-cart.svg";
import { removeFromCart, updateQuantity } from "../states/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const ModalCarrito = () => {
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
    <div>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasCarrito"
        aria-controls="offcanvasCarrito"
        style={{ display: "none" }}
        id="carritoButton"
      ></button>

      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="offcanvasCarrito"
        aria-labelledby="offcanvasCarritoLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body offcanvasBody">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <h4>¡Tu carrito está vacío!</h4>
              <img src={img} alt="Icon-Carrito" />
            </div>
          ) : (
            <>
              <h4>Tu carrito</h4>
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
              <div className="cart-total d-flex justify-content-between align-items-center">
                <div className="total-amount">
                  <h5>Total</h5>
                  <p>${total}</p>
                </div>
                <Link to="/carrito" className="btn btn-primary mt-2">
                  Ir a comprar
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
