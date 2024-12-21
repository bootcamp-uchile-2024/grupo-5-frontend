import { useState, useEffect } from "react";
import { Modal, Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getDireccion } from "../../services/Direccion";
import Localitation2 from "../../assets/icons/Location2.svg";
import Edit from "../../assets/icons/Edit.svg";
import Trash from "../../assets/icons/Trash_direccion.svg";
import Mas from "../../assets/icons/Add_round_fill.svg";
import { ModalNuevaDireccion } from "../Direccion/NuevaDireccion";
import { ModalEliminarDireccion } from "../Direccion/EliminarDireccion";
import { ModalEditarDireccion } from "../Direccion/EditarDireccion";
import "../css/Direccion/MisDirecciones.css";
import "../css/ModalForm.css";

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

interface ModalMisDireccionesProps {
  show: boolean;
  onHide: () => void;
  onDireccionSelect: (direccion: Direccion) => void;
}

export const ModalMisDirecciones = ({
  show,
  onHide,
  onDireccionSelect,
}: ModalMisDireccionesProps) => {
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [selectedDireccion, setSelectedDireccion] = useState<Direccion | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [direccionToDelete, setDireccionToDelete] = useState<Direccion | null>(
    null
  );
  const [direccionToEdit, setDireccionToEdit] = useState<Direccion | null>(
    null
  );
  const idUsuario = useSelector((state: RootState) => state.user.idUsuario);

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
      if (idUsuario) {
        const data = await getDireccion(idUsuario);
        setDirecciones(data);
      }
    };
    fetchDireccion();
  }, [idUsuario]);

  const handleAddSuccess = async () => {
    const data = await getDireccion(idUsuario);
    setDirecciones(data);
    setShowModal(false);
  };

  const handleDeleteSuccess = () => {
    setDirecciones(
      direcciones.filter(
        (direccion) => direccion.idDireccion !== direccionToDelete?.idDireccion
      )
    );
    setShowConfirmModal(false);
  };

  const handleEditSuccess = async () => {
    const data = await getDireccion(idUsuario);
    setDirecciones(data);
    handleCloseEditModal();
  };

  const handleDireccionSelect = (direccion: Direccion) => {
    setSelectedDireccion(direccion);
    onDireccionSelect(direccion);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header
        closeButton
        style={{ margin: "20px 20px 0 20px" }}
      ></Modal.Header>
      <Modal.Body style={{ padding: "0" }}>
        <div className="LocalitationContainer">
          <img src={Localitation2} alt="ImgMas" className="Localitation2" />
          <p className="titulo">Mis Direcciones</p>
        </div>
        <Row className="d-flex justify-content-center">
          <Col md={10}>
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
                        padding: "10px 20px",
                      }}
                      type="radio"
                      label={
                        <>
                          <div className="direccionContainer">
                            <p className="alias">{direccion.alias}</p>
                            <p className="direccionUsuario">
                              {direccion.calle} {direccion.numero}
                            </p>
                            <p className="comuna">
                              {direccion.comuna.nombreComuna}
                            </p>
                          </div>
                          <div className="editTrash">
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
                      onChange={() => handleDireccionSelect(direccion)}
                    />
                  ))
                ) : (
                  <p>Cargando direcciones...</p>
                )}
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center pb-5 pt-0">
          <Col
            className="pt-0"
            md={10}
            style={{ border: "solid 1px #F2B705", borderRadius: "8px" }}
          >
            <div className="agregarDireccionContainer">
              <img
                className="SignoMas"
                src={Mas}
                alt="Signo-Más"
                onClick={handleShowModal}
              />
              <p className="agregarDireccion" onClick={handleShowModal}>
                Agregar otra dirección
              </p>
            </div>
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
        />
      </Modal.Body>
    </Modal>
  );
};
