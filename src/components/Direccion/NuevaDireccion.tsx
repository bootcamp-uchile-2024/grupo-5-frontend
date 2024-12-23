import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import ImgMas from "../../assets/icons/SignoMas.svg";
import "../css/Direccion/NuevaDireccion.css";

interface Comuna {
  idComuna: number;
  nombreComuna: string;
}

interface Region {
  idRegion: number;
  nombreRegion: string;
}

interface ModalNuevaDireccionProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export const ModalNuevaDireccion = ({
  show,
  onHide,
  onSuccess,
}: ModalNuevaDireccionProps) => {
  const usuario = useSelector((state: RootState) => state.user);
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [comunas, setComunas] = useState<Comuna[]>([]);
  const [idRegion, setIdRegion] = useState<number | null>(null);
  const [idComuna, setIdComuna] = useState<number | null>(null);
  const [alias, setAlias] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [referencias, setReferencias] = useState("");
  const [personaContacto, setPersonaContacto] = useState("");
  const [telefonoContacto, setTelefonoContacto] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchRegiones = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/region`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setRegiones(data);
      } catch (error) {
        console.error("Error al obtener las regiones:", error);
      }
    };

    fetchRegiones();
  }, []);

  useEffect(() => {
    if (idRegion !== null) {
      const fetchComunas = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/comuna/region/${idRegion}`
          );
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          setComunas(data);
        } catch (error) {
          console.error("Error al obtener las comunas:", error);
        }
      };

      fetchComunas();
    }
  }, [idRegion]);

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        idRegion &&
        idComuna &&
        alias.trim() !== "" &&
        calle.trim() !== "" &&
        numero.trim() !== "" &&
        personaContacto.trim() !== "" &&
        telefonoContacto.trim() !== ""
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [
    idRegion,
    idComuna,
    alias,
    calle,
    numero,
    personaContacto,
    telefonoContacto,
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nuevaDireccion = {
      idUsuario: usuario.idUsuario,
      idComuna: idComuna,
      alias,
      calle,
      numero,
      referencias,
      personaContacto,
      telefonoContacto: telefonoContacto,
    };

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/direccion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaDireccion),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      onSuccess();
      onHide();
    } catch (error) {
      console.error("Error al agregar la dirección:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <p className="titulo-nueva_direccion">Registrar nueva dirección</p>
          </div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group
              controlId="formRegion"
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
                Región
              </Form.Label>
              <Col sm={10}>
                <Form.Select
                  as="select"
                  value={idRegion ?? ""}
                  onChange={(e) => setIdRegion(parseInt(e.target.value, 10))}
                  style={{
                    borderRadius: "32px",
                  }}
                >
                  <option value="">Región</option>
                  {regiones.map((region) => (
                    <option key={region.idRegion} value={region.idRegion}>
                      {region.nombreRegion}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group
              controlId="formComuna"
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
                Comuna
              </Form.Label>
              <Col sm={10}>
                <Form.Select
                  as="select"
                  value={idComuna ?? ""}
                  onChange={(e) => setIdComuna(parseInt(e.target.value, 10))}
                  style={{
                    borderRadius: "32px",
                  }}
                >
                  <option value="">Seleccione una comuna</option>
                  {comunas.map((comuna) => (
                    <option key={comuna.idComuna} value={comuna.idComuna}>
                      {comuna.nombreComuna}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group
              controlId="formAlias"
              as={Row}
              className="d-flex justify-content-center align-items-center mt-2"
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
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  style={{
                    borderRadius: "32px",
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group
              controlId="formCalle"
              as={Row}
              className="d-flex justify-content-center align-items-center mt-2"
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
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                  style={{
                    borderRadius: "32px",
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group
              controlId="formNumero"
              as={Row}
              className="d-flex justify-content-center align-items-center mt-2"
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
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  style={{
                    borderRadius: "32px",
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group
              controlId="formReferencias"
              as={Row}
              className="d-flex justify-content-center align-items-center mt-2"
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
                  value={referencias}
                  onChange={(e) => setReferencias(e.target.value)}
                  style={{
                    borderRadius: "32px",
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group
              controlId="formPersonaContacto"
              as={Row}
              className="d-flex justify-content-center align-items-center mt-2"
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
                  value={personaContacto}
                  onChange={(e) => setPersonaContacto(e.target.value)}
                  style={{
                    borderRadius: "32px",
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group
              controlId="formTelefonoContacto"
              as={Row}
              className="d-flex justify-content-center align-items-center mt-2"
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
                  value={telefonoContacto}
                  onChange={(e) => setTelefonoContacto(e.target.value)}
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
                disabled={loading || !isFormValid}
              >
                Continuar
              </Button>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
