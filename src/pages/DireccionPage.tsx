import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/DireccionPage.module.css";
import "./css/direccion.css";
import ShoppingCart from "../assets/icons/shopping-cart.svg";
import Location from "../assets/icons/Location.svg";
import Location2 from "../assets/icons/Location2.svg";
import Caja from "../assets/icons/Caja.svg";
import Pago from "../assets/icons/dollar-alt.svg";
import Chevron from "../assets/icons/chevron-right.svg";
import Edit from "../assets/icons/Edit.svg";
import Trash from "../assets/icons/Trash_direccion.svg";
import ImgMas from "../assets/icons/SignoMas.svg";
import { RootState } from "../states/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDireccion } from "../utils/getDireccion";
import { updateForm } from "../states/formSlice";
import ModalNuevaDireccion from "../components/ModalNuevaDireccion";


interface Direccion {
  idDireccion: number;
  alias: string;
  calle: string;
  numero: string;
  comuna: {
    nombreComuna: string;
  };
  referencias?: string;
}

export const DireccionPage = () => {
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [selectedDireccion, setSelectedDireccion] = useState<Direccion | null>(null);
  const [showModal, setShowModal] = useState(false);
  const idUsuario = useSelector((state: RootState) => state.user.idUsuario);
  const usuario = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchDireccion = async () => {
      if (idUsuario) {
        const data = await getDireccion(idUsuario);
        if (data.length > 0) {
          setDirecciones(data);
        } else {
          console.log("No se encontraron direcciones.");
        }
      } else {
        console.log("idUsuario no es válido.");
      }
    };
    fetchDireccion();
  }, [idUsuario]);

  const handleNavigate = () => {
    if (selectedDireccion) {
      dispatch(updateForm({
        nombre: usuario.nombres,
        rut: usuario.rut,
        telefono: usuario.telefono,
        correo: usuario.email,
        region: "",
        comuna: selectedDireccion.comuna.nombreComuna,
        direccion: selectedDireccion.calle,
        numero: selectedDireccion.numero,
        referencias: selectedDireccion.referencias || "",
      }));
      navigate("/resumen-carrito");
    } else {
      console.log("No se ha seleccionado ninguna dirección.");
    }
  };

  return (
    <MainLayout>
      <Container>
        <Row className="mb-5 pt-5">
          <Link to="/" className={styles.linkVolver}>
            <span
              aria-hidden="true"
              className="carousel-control-prev-icon"
              style={{
                width: "24px",
                height: "24px",
                filter: "invert(1)",
                marginRight: "8px",
                marginLeft: "30px",
              }}
            />
            Volver
          </Link>
        </Row>
        <div className={styles.customContainer}>
          <h1 className={styles.titulo}>Dirección</h1>
          <Row className="d-flex justify-content-center">
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center `}
            >
              <div className={styles.icons}>
                <img src={ShoppingCart} alt="shopping-cart-img" />
              </div>
              <span className={styles.iconText}>Carrito de compra</span>
            </Col>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={Chevron}
                alt="chevron-right-img"
                className={styles.chevron}
              />
            </Col>
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center mb-3`}
            >
              <div className={styles.iconLocation}>
                <img src={Location} alt="Location-img" />
              </div>
              <span className={styles.iconText}>Dirección</span>
            </Col>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={Chevron}
                alt="chevron-right-img"
                className={styles.chevron}
              />
            </Col>
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center mb-3`}
            >
              <div className={styles.icons}>
                <img src={Caja} alt="Caja-img" />
              </div>
              <span className={styles.iconText}>Resumen</span>
            </Col>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={Chevron}
                alt="chevron-right-img"
                className={styles.chevron}
              />
            </Col>
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center mb-3`}
            >
              <div className={styles.icons}>
                <img src={Pago} alt="Pago-img" />
              </div>
              <span className={styles.iconText}>Pago</span>
            </Col>
          </Row>
        </div>

        <Row className="d-flex justify-content-center pb-4">
          <Col
            xs={10}
            md={10}
            style={{ borderBottom: "1px solid #BFBFBF" }}
          ></Col>
        </Row>

        <Row className="d-flex justify-content-center pb-4">
          <div className={styles.direccion}>
            <img src={Location2} alt="Location2" />
            <p>Mis Direcciones</p>
          </div>
        </Row>

        <Row className="d-flex justify-content-center pb-4">
          <Col md={5}>
            <Form>
            <Form.Group as={Row} className="mb-3">
                {direcciones.length > 0 ? (
                  direcciones.map((direccion) => (
                    <Form.Check
                      key={direccion.idDireccion}
                      style={{
                        border: "1px solid #BFBFBF",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px", 
                      }}
                      type="radio"
                      label={
                        <>
                          <div className={styles.direccionContainer}>
                            <p className={styles.alias}>{direccion.alias}</p>
                            <p className={styles.direccionUsuario}>
                              {direccion.calle} {direccion.numero}
                            </p>
                            <p className={styles.comuna}>
                              {direccion.comuna.nombreComuna}
                            </p>
                          </div>
                          <div className={styles.editTrash}>
                            <img src={Edit} alt="Descripción de la imagen" />
                            <img src={Trash} alt="Trash" />
                          </div>
                        </>
                      }
                      name="formHorizontalRadios"
                      id={`formHorizontalRadios${direccion.idDireccion}`}
                      onChange={() => setSelectedDireccion(direccion)}
                    />
                  ))
                ) : (
                  <p>Cargando direcciones...</p>
                )}
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
          <img className={styles.SignoMas} src={ImgMas} alt="Sigo-Más" onClick={handleShowModal} />
          <p className={styles.agregarDireccion} onClick={handleShowModal}>Agregar otra dirección</p>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Nueva Dirección</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalNuevaDireccion handleClose={handleCloseModal} />
          </Modal.Body>
        </Modal>

        <Row className="d-flex justify-content-center pb-4 pt-4">
          <Col
            xs={10}
            md={10}
            style={{ borderBottom: "1px solid #BFBFBF" }}
          ></Col>
        </Row>

        <Row className="d-flex justify-content-center pb-4">
          <Button
            style={{
              width: "235px",
              height: "56px",
              borderRadius: "32px",
              backgroundColor: "#F2B705",
              border: "none",
              color: "#363636",
              fontSize: "16px",
              fontWeight: "500",
              fontFamily: "Montserrat , serif"
            }}
            onClick={handleNavigate}
          >
            Continuar
          </Button>
        </Row>
      </Container>
    </MainLayout>
  );
};
