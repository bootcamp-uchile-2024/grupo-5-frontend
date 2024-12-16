import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { updateForm } from "../states/formSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./css/ModalForm.css";
import ImgMas from "../assets/icons/SignoMas.svg";
import { Col, Row } from "react-bootstrap";

interface ModalFormProps {
  show: boolean;
  onHide: () => void;
}

interface Region {
  idRegion: number;
  nombreRegion: string;
}

interface Comuna {
  idComuna: number;
  nombreComuna: string;
}

export const ModalForm = ({ show, onHide }: ModalFormProps) => {
  const dispatch = useDispatch();
  const { region, comuna, direccion, numero, referencias } = useSelector(
    (state: RootState) => state.form
  );

  const [formState, setFormState] = useState({
    region,
    comuna,
    direccion,
    numero,
    referencias,
  });
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [comunas, setComunas] = useState<Comuna[]>([]);

  useEffect(() => {
    setFormState({ region, comuna, direccion, numero, referencias });
  }, [region, comuna, direccion, numero]);

  useEffect(() => {
    const fetchRegiones = async () => {
      try {
        const response = await fetch("http://107.21.145.167:5001/region");
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
    if (region) {
      const fetchComunas = async () => {
        try {
          const response = await fetch(
            `http://107.21.145.167:5001/comuna/region/${region}`
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
  }, [region, show]);

  const handleRegionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });

    if (value) {
      try {
        const response = await fetch(
          `http://107.21.145.167:5001/comuna/region/${value}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setComunas(data);
      } catch (error) {
        console.error("Error al obtener las comunas:", error);
      }
    } else {
      setComunas([]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormState = {
      ...formState,
      referencias: formState.referencias || referencias,
    };
    dispatch(updateForm(updatedFormState));
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src={ImgMas} alt="Icono" />
          <p className="titulo">Editar dirección</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            as={Row}
            controlId="formRegion"
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
                name="region"
                value={formState.region}
                onChange={handleRegionChange}
                style={{
                  borderRadius: "32px",
                }}
              >
                <option value="">Seleccionar</option>
                {regiones.map((region) => (
                  <option key={region.idRegion} value={region.idRegion}>
                    {region.nombreRegion}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            controlId="formComuna"
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
                name="comuna"
                value={formState.comuna}
                onChange={handleChange}
                style={{
                  borderRadius: "32px",
                }}
              >
                <option value="">Seleccionar</option>
                {comunas.map((comuna) => (
                  <option key={comuna.idComuna} value={comuna.nombreComuna}>
                    {comuna.nombreComuna}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            controlId="formDireccion"
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
                name="direccion"
                value={formState.direccion}
                onChange={handleChange}
                style={{
                  borderRadius: "32px",
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            controlId="formNumero"
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
            as={Row}
            controlId="formReferencias"
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
                name="referencias"
                value={formState.referencias}
                onChange={handleChange}
                style={{
                  borderRadius: "32px",
                }}
              />
            </Col>
          </Form.Group>
          <Col md={12} className="d-flex justify-content-center pt-3 pb-5">
            <Button
              type="submit"
              variant="warning"
              style={{
                width: "172px",
                height: "40px",
                borderRadius: "32px",
                color: "#363636",
                fontSize: "16px",
                fontFamily: "Montserrat",
                fontWeight: "500",
              }}
            >
              Guardar Cambios
            </Button>
          </Col>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
