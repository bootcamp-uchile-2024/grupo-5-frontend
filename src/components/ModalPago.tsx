import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./css/ModalPago.css";
import check from "../assets/icons/Check_fill.svg";
import Message from "../assets/icons/Export_Message.svg";

interface ModalPagoProps {
  show: boolean;
  onHide: () => void;
}

export const ModalPago = ({ show, onHide }: ModalPagoProps) => {
  const [numeroOrden, setNumeroOrden] = useState<string>("");

  useEffect(() => {
    if (show) {
      const generarNumeroOrden = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };
      setNumeroOrden(generarNumeroOrden());
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4 className="titulo"> ¡Gracias por tu Compra!</h4>
        <img className="img_check" src={check} alt="Check" />
        <p className="parrafo_compra">Tu compra se ha realizado con éxito</p>
        <p className="orden">N° Orden</p>
        <p className="n_orden">{numeroOrden}</p>
        <img className="img_correo" src={Message} alt="Message" />
        <p className="parrafo_correo">
          Se ha enviado tu boleta a correo electrónico con el detalle de tu
          compra
        </p>
      </Modal.Body>
    </Modal>
  );
};
