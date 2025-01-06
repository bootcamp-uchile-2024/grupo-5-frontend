import { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
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
import { useSelector } from "react-redux";
import { getDireccion } from "../services/Direccion";
import { ModalNuevaDireccion } from "../components/Direccion/NuevaDireccion";
import { ModalEliminarDireccion } from "../components/Direccion/EliminarDireccion";
import { ModalEditarDireccion } from "../components/Direccion/EditarDireccion";

interface Direccion {
  idDireccion: number;
  alias: string;
  calle: string;
  numero: string;
  comuna: {
    idComuna: number;
    nombreComuna: string;
  };
  referencias?: string;
  personaContacto?: string;
  telefonoContacto?: string;
}

export const DireccionPage = () => {
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [selectedDireccion, setSelectedDireccion] = useState<Direccion | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [direccionToDelete, setDireccionToDelete] = useState<Direccion | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [direccionToEdit, setDireccionToEdit] = useState<Direccion | null>(
    null
  );
  const idUsuario = useSelector((state: RootState) => state.user.idUsuario);

  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowConfirmModal = (direccion: Direccion) => {
    setDireccionToDelete(direccion);
    setShowConfirmModal(true);
  };
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  const handleShowEditModal = (direccion: Direccion) => {
    setDireccionToEdit(direccion);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  useEffect(() => {
    const fetchDireccion = async () => {
      console.log("ID Usuario:", idUsuario);
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
      navigate("/resumen-carrito", {
        state: { selectedDireccion, source: "DireccionPage" },
      });
    } else {
      console.log("No se ha seleccionado ninguna dirección.");
    }
  };

  const handleDeleteSuccess = () => {
    setDirecciones(
      direcciones.filter(
        (direccion) => direccion.idDireccion !== direccionToDelete?.idDireccion
      )
    );
    setShowConfirmModal(false);
    window.location.reload();
  };

  const handleAddSuccess = async () => {
    const data = await getDireccion(idUsuario);
    setDirecciones(data);
    setShowModal(false);
  };

  const handleEditSuccess = async () => {
    const data = await getDireccion(idUsuario);
    setDirecciones(data);
    handleCloseEditModal();
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
                        border:
                          direccion.idDireccion ===
                          selectedDireccion?.idDireccion
                            ? "1px solid #F2B705"
                            : "1px solid #BFBFBF",
                        backgroundColor:
                          direccion.idDireccion ===
                          selectedDireccion?.idDireccion
                            ? "#FCEDC0"
                            : "transparent",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        padding: "15px 25px",
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
                            <img
                              src={Edit}
                              alt="Edit"
                              onClick={() => handleShowEditModal(direccion)}
                            />
                            <img
                              src={Trash}
                              alt="Trash"
                              onClick={() => handleShowConfirmModal(direccion)}
                            />
                          </div>
                        </>
                      }
                      name="formHorizontalRadios"
                      id={`formHorizontalRadios${direccion.idDireccion}`}
                      onChange={() => setSelectedDireccion(direccion)}
                    />
                  ))
                ) : null}
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            <img
              className={styles.SignoMas}
              src={ImgMas}
              alt="Sigo-Más"
              onClick={handleShowModal}
            />
            <p className={styles.agregarDireccion} onClick={handleShowModal}>
              Agregar otra dirección
            </p>
          </Col>
        </Row>

        <ModalNuevaDireccion
          show={showModal}
          onHide={handleCloseModal}
          onSuccess={handleAddSuccess}
        />

        <ModalEliminarDireccion
          show={showConfirmModal}
          onHide={handleCloseConfirmModal}
          direccion={direccionToDelete}
          onDelete={handleDeleteSuccess}
        />

        <ModalEditarDireccion
          show={showEditModal}
          onHide={handleCloseEditModal}
          direccion={direccionToEdit}
          onSuccess={handleEditSuccess}
          source="DireccionPage"
          userData={idUsuario}
        />

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
              fontFamily: "Montserrat , serif",
            }}
            onClick={handleNavigate}
            disabled={!selectedDireccion}
          >
            Continuar
          </Button>
        </Row>
      </Container>
    </MainLayout>
  );
};
