import { MainLayout } from "../layout/MainLayout";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AvatarPerfil from "../assets/icons/Avatar_perfil.svg";
import Add_mascotas from "../assets/icons/Add_mascotas.svg";
import styles from "./css/perfilUsuario.module.css";
import MisDirecciones from "../assets/PerfilUsuarios/MisDirecciones.png";
import MisMediosdePago from "../assets/PerfilUsuarios/MisMediosdePago.png";
import MisCompras from "../assets/PerfilUsuarios/MisCompras.png";
import MisDatos from "../assets/PerfilUsuarios/MisDatos.png";
import Carousels1 from "../assets/Carousels/Carousels1.png";
import Carousels2 from "../assets/Carousels/Carousels2.png";

const apiUrl = import.meta.env.VITE_API_URL;

export const PerfildeUsuario = () => {
  const [perfiles, setPerfiles] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<string>(AvatarPerfil);
  const [, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setPerfiles([MisDirecciones, MisMediosdePago, MisCompras, MisDatos]);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        setError("El archivo no debe superar los 2MB.");
        return;
      }

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Solo se permiten imágenes en formato JPG o PNG.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatar(base64);
        enviarImagenAlBackend(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const enviarImagenAlBackend = async (base64Image: string) => {
    try {
      const response = await fetch(`${apiUrl}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: base64Image }),
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen. Inténtalo de nuevo.");
      }
      alert("Imagen subida exitosamente.");
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo subir la imagen al servidor.");
    }
  };

  const irADireccionPage = () => {
    navigate("");
  };

  return (
    <MainLayout>
      <Container
        className="d-flex flex-column align-items-center mt-5"
        style={{ position: "relative" }}
      >
        <Button
          onClick={() => document.getElementById("avatar-upload")?.click()}
          style={{
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "30px",
            padding: 0,
            border: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Image
            src={avatar}
            alt="Avatar principal"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Button>

        <input
          id="avatar-upload"
          type="file"
          style={{ display: "none" }}
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />

        <Row className="justify-content-center mb-5" style={{ gap: "20px" }}>
          {perfiles.map((perfil, index) => (
            <Col key={index} xs="auto">
              <Button
                onClick={index === 0 ? irADireccionPage : undefined}
                style={{
                  width: "245px",
                  height: "152px",
                  borderRadius: "0px 0px 0px px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 6px rgba(255, 255, 255, 0.2)",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#fff",
                }}
              >
                <Image
                  src={perfil}
                  alt={`Perfil ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Button>
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center mb-5">
          <Col xs="auto" className="d-flex flex-column align-items-center">
            <img src={Add_mascotas} alt="Agregar mascota" />
            <p className={styles.addMascotas}>Agregar mascota</p>
          </Col>
        </Row>

        <Container fluid className="mb-5">
          <Carousel
            indicators={false}
            prevIcon={
              <span
                aria-hidden="true"
                className="carousel-control-prev-icon"
                style={{
                  width: "66px",
                  height: "66px",
                  filter: "invert(1)",
                }}
              />
            }
            nextIcon={
              <span
                aria-hidden="true"
                className="carousel-control-next-icon"
                style={{
                  width: "66px",
                  height: "66px",
                  filter: "invert(1)",
                }}
              />
            }
          >
            <Carousel.Item>
              <Image
                src={Carousels1}
                alt="Primera imagen"
                fluid
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={Carousels2}
                alt="Segunda imagen"
                fluid
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </Carousel.Item>
          </Carousel>
        </Container>
      </Container>
    </MainLayout>
  );
};
