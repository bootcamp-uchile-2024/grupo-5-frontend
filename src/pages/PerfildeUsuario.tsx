import { MainLayout } from "../layout/MainLayout";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Carousel } from "react-bootstrap";

export const PerfildeUsuario = () => {
  const [perfiles, setPerfiles] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<string>("https://via.placeholder.com/240");

  useEffect(() => {
    
    setPerfiles([
      "src/assets/PerfilUsuarios/MisDirecciones.png",
      "src/assets/PerfilUsuarios/MisMediosdePago.png",
      "src/assets/PerfilUsuarios/MisCompras.png",
      "src/assets/PerfilUsuarios/MisDatos.png",
    ]);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string); 
      };
      reader.readAsDataURL(file); 
    }
  };

  return (
    <MainLayout>
      <Container className="d-flex flex-column align-items-center mt-5">
        
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
          accept="image/*"
          onChange={handleFileChange}
        />

        
        <Row className="justify-content-center mb-5" style={{ gap: "20px" }}>
          {perfiles.map((perfil, index) => (
            <Col key={index} xs="auto">
              <div
                style={{
                  width: "245px",
                  height: "152px",
                  borderRadius: "32px 0px 0px 0px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
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
              </div>
            </Col>
          ))}
        </Row>

        
        <div className="d-flex flex-column align-items-center mb-5">
          <Button
            style={{
              width: "149px",
              height: "149px",
              borderRadius: "50%",
              backgroundColor: "#7fd54d", 
              border: "none",
              color: "#fff",
              fontSize: "100px", 
              lineHeight: "1",
              textAlign: "center",
              padding: "0",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            +
          </Button>
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "32px",
              fontWeight: "500",
              lineHeight: "39.01px",
              textAlign: "center",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              marginTop: "35px",
              color: "#333",
            }}
          >
            Agregar Mascota
          </span>
        </div>

       
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
                src="src/assets/Carousels/Carousels1.png"
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
                src="src/assets/Carousels/Carousels2.png"
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
