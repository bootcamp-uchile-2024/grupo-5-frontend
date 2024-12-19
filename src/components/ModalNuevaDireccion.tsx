import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { Button, Form, Alert } from "react-bootstrap";

interface Comuna {
  idComuna: number;
  nombreComuna: string;
}

const ModalNuevaDireccion = ({ handleClose }: { handleClose: () => void }) => {
  const usuario = useSelector((state: RootState) => state.user);
  const [alias, setAlias] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [referencias, setReferencias] = useState("");
  const [personaContacto, setPersonaContacto] = useState("");
  const [telefonoContacto, setTelefonoContacto] = useState("");
  const [idComuna, setIdComuna] = useState<number | null>(null);
  const [comunas, setComunas] = useState<Comuna[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchComunas = async () => {
      try {
        const response = await fetch("http://107.21.145.167:5001/comuna");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Comunas obtenidas:", data); // Verifica la respuesta de la API
        setComunas(data);
      } catch (error) {
        console.error("Error al obtener las comunas:", error);
      }
    };

    fetchComunas();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nuevaDireccion = {
      idUsuario: usuario.idUsuario,
      idComuna: idComuna, // Asegúrate de que este valor esté configurado correctamente
      alias,
      calle,
      numero,
      referencias,
      personaContacto,
      telefonoContacto: parseInt(telefonoContacto, 10),
    };

    console.log("Datos enviados:", nuevaDireccion); // Verifica los datos que estás enviando

    try {
      const response = await fetch("http://107.21.145.167:5001/direccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaDireccion),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Respuesta de la API:", errorData); // Verifica la respuesta de la API
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Dirección guardada:", data);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        handleClose();
      }, 2000); // Muestra el mensaje de éxito durante 2 segundos y luego cierra el modal
    } catch (error) {
      console.error("Error al guardar la dirección:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error
    }
  };

  return (
    <>
      {showSuccess && <Alert variant="success">Dirección guardada correctamente</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAlias">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCalle">
          <Form.Label>Calle</Form.Label>
          <Form.Control
            type="text"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formNumero">
          <Form.Label>Número</Form.Label>
          <Form.Control
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formReferencias">
          <Form.Label>Referencias</Form.Label>
          <Form.Control
            type="text"
            value={referencias}
            onChange={(e) => setReferencias(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPersonaContacto">
          <Form.Label>Persona de Contacto</Form.Label>
          <Form.Control
            type="text"
            value={personaContacto}
            onChange={(e) => setPersonaContacto(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formTelefonoContacto">
          <Form.Label>Teléfono de Contacto</Form.Label>
          <Form.Control
            type="text"
            value={telefonoContacto}
            onChange={(e) => setTelefonoContacto(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formIdComuna">
          <Form.Label>Comuna</Form.Label>
          <Form.Control
            as="select"
            value={idComuna || ""}
            onChange={(e) => setIdComuna(parseInt(e.target.value, 10))}
          >
            <option value="">Selecciona una comuna</option>
            {comunas.map((comuna) => (
              <option key={comuna.idComuna} value={comuna.idComuna}>
                {comuna.nombreComuna}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
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
      </Form>
    </>
  );
};

export default ModalNuevaDireccion;