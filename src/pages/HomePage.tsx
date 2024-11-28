import { MainLayout } from "../layout/MainLayout";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import carouselImage from "../assets/home/Carousels1.png";
import CardSection1 from "../assets/Card_perros.png";
import CardSection2 from "../assets/Card_gatos.png";
import CardSection3 from "../assets/Card_exóticos.png";
import CardImage from "../assets/home/peludo.png";
import { CatalogoProductos } from "./CatalogoProductos";
import styles from "./css/HomePage.module.css";

export const HomePage = () => {
  return (
    <MainLayout>
      <Container fluid>
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={carouselImage}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={carouselImage}
                  alt="Second slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          <Col xs={12} sm={6} md={3} className="mb-3">
            <img src={CardSection1} alt="CardSection1" className="img-fluid" />
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-3">
            <img src={CardSection2} alt="CardSection2" className="img-fluid" />
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-3">
            <img src={CardSection3} alt="CardSection3" className="img-fluid" />
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          <Col md={6}>
            <h1 className={styles.titulo}>Recomendados para ti</h1>
          </Col>
          <Col md={10}>
            <CatalogoProductos />
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          <Col xs={12} style={{ position: "relative", padding: 0 }}>
            <img
              src={CardImage}
              alt="Card image"
              className="img-fluid"
              style={{
                width: "100%",
                height: "446px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#C8C8C8",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -50,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              <h1 className={styles.titulo2}>¿Quieres cuidar de tu peludo?</h1>
              <p className={styles.subtitulo}>Te invitamos a llenar tu ficha de mascota.</p>
              <p className={styles.texto}>
                Al rellenar la ficha accederás a recomendaciones personalizadas
                según las caracteristicas y salud de tu mascota.
              </p>
              <button className={styles.boton}>Llenar ficha</button>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};
