import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { editarDireccion } from "../../services/Direccion";
import ImgMas from "../../assets/icons/SignoMas.svg";
import "../css/ModalForm.css";

interface ModalEditarDireccionProps {
  show: boolean;
  onHide: () => void;
  direccion: Direccion | null;
  onSuccess: () => void;
}

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

export const ModalEditarDireccion = ({
  show,
  onHide,
  direccion,
  onSuccess,
}: ModalEditarDireccionProps) => {
  const [formState, setFormState] = useState({
    idComuna: direccion?.comuna.idComuna || "",
    alias: direccion?.alias || "",
    calle: direccion?.calle || "",
    numero: direccion?.numero || "",
    referencias: direccion?.referencias || "",
    personaContacto: direccion?.personaContacto || "",
    telefonoContacto: direccion?.telefonoContacto || "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (direccion) {
      setFormState({
        idComuna: direccion.comuna.idComuna,
        alias: direccion.alias,
        calle: direccion.calle,
        numero: direccion.numero,
        referencias: direccion.referencias || "",
        personaContacto: direccion.personaContacto || "",
        telefonoContacto: direccion.telefonoContacto || "",
      });
    }
  }, [direccion]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (direccion) {
      const success = await editarDireccion(direccion.idDireccion, formState);
      if (success) {
        onSuccess();
        onHide();
      }
    }
  };

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        formState.alias.trim() !== "" &&
        formState.calle.trim() !== "" &&
        formState.numero.trim() !== "" &&
        formState.personaContacto.trim() !== "" &&
        formState.telefonoContacto.trim() !== ""
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [
    formState.alias,
    formState.calle,
    formState.numero,
    formState.personaContacto,
    formState.telefonoContacto,
  ]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ padding: "30px 30px 0 0", border: "none" }}
      ></Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <img src={ImgMas} alt="Icono" />
          <p className="titulo-nueva_direccion">Editar "{formState.alias}"</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlId="formAlias"
            as={Row}
            className="d-flex justify-content-center align-items-center mt-3"
          >
            <Form.Label
              column
              sm={1}
              style={{
                color: "#000000",
                fontSize: "16px",
                fontFamily: "Montserrat",
                fontWeight: "500",
                marginRight: "30px",
              }}
            >
              Alias
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="alias"
                value={formState.alias}
                onChange={handleChange}
                style={{
                  borderRadius: "32px",
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            controlId="formCalle"
            as={Row}
            className="d-flex justify-content-center align-items-center mt-3"
          >
            <Form.Label
              column
              sm={1}
              style={{
                color: "#000000",
                fontSize: "16px",
                fontFamily: "Montserrat",
                fontWeight: "500",
                marginRight: "30px",
              }}
            >
              Calle
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="calle"
                value={formState.calle}
                onChange={handleChange}
                style={{
                  borderRadius: "32px",
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            controlId="formNumero"
            as={Row}
            className="d-flex justify-content-center align-items-center mt-3"
          >
            <Form.Label
              column
              sm={1}
              style={{
                color: "#000000",
                fontSize: "16px",
                fontFamily: "Montserrat",
                fontWeight: "500",
                marginRight: "30px",
              }}
            >
              N°
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="numero"
                value={formState.numero}
                onChange={handleChange}
                style={{
                  borderRadius: "32px",
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            controlId="formReferencias"
            as={Row}
            className="d-flex justify-content-center align-items-center mt-3"
          >
            <Form.Label
              column
              sm={1}
              style={{
                color: "#000000",
                fontSize: "16px",
                fontFamily: "Montserrat",
                fontWeight: "500",
                marginRight: "30px",
              }}
            >
              Referencia
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="referencias"
                value={formState.referencias}
                onChange={handleChange}
                style={{
                  borderRadius: "32px",
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            controlId="formPersonaContacto"
            as={Row}
            className="d-flex justify-content-center align-items-center mt-3"
          >
            <Form.Label
              column
              sm={1}
              style={{
                color: "#000000",
                fontSize: "16px",
                fontFamily: "Montserrat",
                fontWeight: "500",
                marginRight: "30px",
              }}
            >
              Contacto
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="personaContacto"
                value={formState.personaContacto}
                onChange={handleChange}
                style={{
                  borderRadius: "32px",
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            controlId="formTelefonoContacto"
            as={Row}
            className="d-flex justify-content-center align-items-center mt-3"
          >
            <Form.Label
              column
              sm={1}
              style={{
                color: "#000000",
                fontSize: "16px",
                fontFamily: "Montserrat",
                fontWeight: "500",
                marginRight: "30px",
              }}
            >
              Teléfono
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="telefonoContacto"
                value={formState.telefonoContacto}
                onChange={handleChange}
                style={{
                  borderRadius: "32px",
                }}
              />
            </Col>
          </Form.Group>
          <Col md={12} className="d-flex justify-content-center pt-3 pb-3">
            <Button
              variant="warning"
              type="submit"
              style={{
                width: "178px",
                height: "40px",
                borderRadius: "32px",
                color: "#363636",
                fontSize: "16px",
                fontFamily: "Montserrat",
                fontWeight: "500",
              }}
              disabled={!isFormValid}
            >
              Continuar
            </Button>
          </Col>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
