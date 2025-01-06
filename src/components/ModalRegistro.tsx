import { Button, Modal } from "react-bootstrap";
import confeti from "../assets/PerfilUsuarios/CONFETI.png";
import party from "../assets/PerfilUsuarios/PARTY.png";
import MascotasRegExitoso from "../assets/PerfilUsuarios/MascotasRegExitoso.png";

interface ModalRegistroProps {
  show: boolean;
  onHide: () => void;
  irAPerfil: () => void;
}

export const ModalRegistro = ({
  show,
  onHide,
  irAPerfil,
}: ModalRegistroProps) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <div style={{ textAlign: "center", padding: "30px" }}>
          <img
            src={confeti}
            alt="Fondo del popup"
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: "-1",
            }}
          />
          <img
            src={party}
            alt="Imagen sobre el popup"
            style={{
              position: "absolute",
              top: "-80px",
              left: "5%",
              width: "150px",
              height: "auto",
              zIndex: "10",
            }}
          />
          <div
            style={{
              fontFamily: "Montserrat",
              fontSize: "40px",
              fontWeight: "900",
              lineHeight: "48px",
              textAlign: "center",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            ¡Felicitaciones!
          </div>
          <div
            style={{
              fontFamily: "Montserrat",
              fontSize: "40px",
              fontWeight: "900",
              lineHeight: "48px",
              textAlign: "center",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              whiteSpace: "nowrap",
            }}
          >
            Ya estás registrado
          </div>
          <div
            style={{
              fontFamily: "Montserrat",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "39px",
              textAlign: "center",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Bienvenido a Petropolis
          </div>
          <div
            style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "19.2px",
              textAlign: "center",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Ahora puedes completar tus datos y rellenar las fichas de tus
            mascotas para disfrutar de todas nuestras recomendaciones y
            beneficios.
          </div>
          <Button
            onClick={irAPerfil}
            style={{
              marginTop: "20px",
              backgroundColor: "#FFD700",
              borderColor: "#FFD700",
              padding: "5px 10px",
              borderRadius: "15px",
              width: "120px",
              color: "#363636",
            }}
          >
            Ir a mi perfil
          </Button>
          <div
            style={{
              width: "546px",
              height: "237px",
              gap: "0px",
              opacity: "0px",
              marginTop: "px",
              position: "relative",
            }}
          >
            <img
              src={MascotasRegExitoso}
              alt="Imagen de ejemplo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: "1",
                marginLeft: "-110px",
              }}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
