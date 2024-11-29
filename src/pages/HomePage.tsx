import { MainLayout } from "../layout/MainLayout";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import carouselImage from "../assets/Carousels/Carousels1.png";
import CardSection1 from "../assets/Card_perros.png";
import CardSection2 from "../assets/Card_gatos.png";
import CardSection3 from "../assets/Card_exóticos.png";
import CardImage from "../assets/home/peludo.png";
import Suscription from "../assets/home/Seccion_sucribete.png";
import { CatalogoProductos } from "./CatalogoProductos";
import styles from "./css/HomePage.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <MainLayout>
      <Container fluid className="d-flex flex-column">
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Carousel
              prevIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-prev-icon"
                  style={{
                    width: "66px",
                    height: "66px",
                    marginLeft: "-90px",
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
                    marginRight: "-90px",
                  }}
                />
              }
            >
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
          <Col xs={3} sm={3} md={3}>
            <img
              src={CardSection1}
              alt="CardSection1"
              className="img-fluid w-100"
            />
          </Col>
          <Col xs={3} sm={3} md={3}>
            <img
              src={CardSection2}
              alt="CardSection2"
              className="img-fluid w-100"
            />
          </Col>
          <Col xs={3} sm={3} md={3} className="mb-3">
            <img
              src={CardSection3}
              alt="CardSection3"
              className="img-fluid w-100"
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          <Col md={6}>
            <h1 className={styles.titulo}>Recomendados para ti</h1>
          </Col>
          <Col md={10} className="justify-content-center">
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              <h1 className={styles.titulo2}>¿Quieres cuidar de tu peludo?</h1>
              <p className={styles.subtitulo}>
                Te invitamos a llenar tu ficha de mascota.
              </p>
              <p className={styles.texto}>
                Al rellenar la ficha accederás a recomendaciones personalizadas
                según las caracteristicas y salud de tu mascota.
              </p>
              <Link to="/registro">
                <Button
                  variant="warning"
                  style={{
                    width: "183px",
                    height: "49px",
                    borderRadius: "32px",
                    marginTop: "20px",
                    color: "#363636",
                    fontSize: "16px",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                  }}
                >
                  Registrate
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mb-3">
          <Col md={8}>
            <h1 className={styles.titulo}>Descuentos y más descuentos</h1>
          </Col>
          <Col md={10}>
            <CatalogoProductos />
          </Col>
        </Row>
        <Row>
          <Col className="p-0">
            <img
              src={Suscription}
              alt="Img_Suscripción"
              className="w-100 h-100"
            />
          </Col>
          <Col className={styles.suscripcion}>
            <div className={styles.suscripcion_text}>
              <h3>No te pierdas nuestras ofertas</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                id dignissim urna. Maecenas sit amet eros eget nisi hendrerit
                mattis fermentum vel metus.
              </p>
              <input
                className={styles.suscripcion_input}
                type="email"
                placeholder="Correo Electrónico"
              />
              <Button
                variant="warning"
                style={{
                  width: "121px",
                  height: "40px",
                  borderRadius: "32px",
                  color: "#363636",
                  fontSize: "16px",
                  fontFamily: "Montserrat",
                  fontWeight: "medium",
                }}
              >
                Suscribirse
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};
