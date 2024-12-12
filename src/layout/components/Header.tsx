import { useEffect, useState, useRef } from "react";
import { isAuth, logout } from "../../services/loginService";
import { useDispatch, useSelector } from "react-redux";
import { del } from "../../states/loggedUserSlice";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import styles from "/src/layout/components/Header.module.css";
import { ModalCarrito } from "../../components/ModalCarrito";
import img from "../../assets/Group-7.svg";
import User from "../../assets/icons/user.svg";
import Search from "../../assets/icons/Search.svg";
import Carrito from "../../assets/icons/Carrito.svg";
import { RootState } from "../../states/store";
import { Col, Row, Container, NavDropdown } from "react-bootstrap";
import { Navbar } from "./Navbar";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.loggedUser);
  const cart = useSelector((state: RootState) => state.cart.productos);
  const totalItems = cart.reduce(
    (total, producto) => total + producto.stockProducto,
    0
  );

  const modalCarritoRef = useRef<{ openModal: () => void }>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = isAuth();
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userState]);

  const handleCarritoClick = () => {
    if (modalCarritoRef.current) {
      modalCarritoRef.current.openModal();
    }
  };

  const handleLogout = () => {
    logout();
    dispatch(del());
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={12} md={2}>
            <Link to="/">
              <img src={img} alt="Logo" className={styles.logo} />
            </Link>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-start">
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Buscar..."
                aria-label="Buscar"
              />
              <img src={Search} alt="Search" className={styles.searchIcon} />
            </div>
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-end">
            <div className={styles.cartContainer}>
              {isLoggedIn ? (
                <>
                  <NavDropdown
                    title={`Hola, ${userState.nombres}`}
                  >
                    <NavDropdown.Item
                      onClick={handleLogout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <img
                    src={userState.avatar}
                    alt="Avatar_usuario"
                    className={`mr-3 ${styles.userIcon}`}
                  />
                </>
              ) : (
                <>
                  <span
                    className={`mr-3 ${styles.login}`}
                    onClick={() => navigate("/login")}
                  >
                    Iniciar Sesión
                  </span>
                  <img
                    src={User}
                    alt="Avatar_usuario"
                    className={`mr-3 ${styles.userIcon}`}
                  />
                </>
              )}

              <div className={styles.CarritoClick} onClick={handleCarritoClick}>
                <span className={`mr-3 ${styles.cartCount}`}>{totalItems}</span>
                <img className={styles.cartIcon} src={Carrito} alt="Carrito" />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-end">
          <Col xs={12} md={10}>
            <Navbar />
          </Col>
        </Row>
      </Container>
      <ModalCarrito ref={modalCarritoRef} />
    </header>
  );
};
