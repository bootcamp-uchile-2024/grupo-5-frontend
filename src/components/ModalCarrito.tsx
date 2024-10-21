import "./css/ModalCarrito.css";
import img from "../assets/shopping-cart.svg"

export const ModalCarrito = () => {
    return (
        <div>
            <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCarrito"
                aria-controls="offcanvasCarrito"
                style={{ display: 'none' }}
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
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body offcanvasBody">
                    <h4>¡Tu carrito está vacío!</h4>
                    <img src={img} alt="Icon-Carrito" />
                </div>
            </div>
        </div>
    );
};