import { Button, Modal } from "react-bootstrap";
import { deleteDireccion } from "../../services/Direccion";
import "../css/Direccion/ModalEliminarDireccion.css";
import "../css/ModalForm.css";

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

interface ModalEliminarProps {
  show: boolean;
  onHide: () => void;
  direccion: Direccion | null;
  onDelete: () => void;
}

export const ModalEliminarDireccion = ({
  show,
  onHide,
  direccion,
  onDelete,
}: ModalEliminarProps) => {
  const handleDeleteDireccion = async () => {
    if (direccion) {
      try {
        const success = await deleteDireccion(direccion.idDireccion);
        if (success) {
          onDelete();
          onHide();
        }
      } catch (error) {
        console.error("Error al eliminar la dirección:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header
        closeButton
        style={{ padding: "30px 30px 10px 0" }}
      ></Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#F6FBFE",
          display: "flex",
          textAlign: "center",
          color: "#000000",
          fontSize: "24px",
          fontWeight: "700",
          fontFamily: "Montserrat, serif",
          lineHeight: "1.2",
          padding: "32px 24px 0",
        }}
      >
        {direccion && (
          <p>
            ¿Estás seguro de que quieres eliminar tu dirección "
            {direccion.alias}"?
          </p>
        )}
      </Modal.Body>
      <Modal.Footer
        style={{
          border: "none",
          display: "flex",
          justifyContent: "center",
          paddingBottom: "40px",
          margin: "0px",
        }}
      >
        <Button
          onClick={handleDeleteDireccion}
          style={{
            backgroundColor: "#F2B705",
            border: "none",
            borderRadius: "32px",
            padding: "8px 16px",
            color: "#363636",
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "Montserrat, serif",
            marginRight: "24px",
          }}
        >
          Si, eliminar!
        </Button>
        <Button
          onClick={onHide}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #F2B705",
            borderRadius: "32px",
            padding: "8px 16px",
            color: "#363636",
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "Montserrat, serif",
          }}
        >
          ¡No, cancelar!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
