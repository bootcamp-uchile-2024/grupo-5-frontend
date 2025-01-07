import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../states/cartSlice";
import { CatalogoProductoDto } from "../interface/Productos/dto/CatalogoProductoDto";
import styles from "./css/CategoriaPerros.module.css";
import addIcon from "../assets/icons/icono_carrito.svg";
import BannerPerro from "../assets/Banner/perros.png";
import AlimentoPerro from "../assets/Categorias/alimentos_perro.png";
import JuguetesPerro from "../assets/Categorias/juguetes_perro.png";
import SaludPerro from "../assets/Categorias/salud_perro.png";
import { formatPrice } from "../utils/formatPrice";
import { Container, Row, Col, Button, Pagination } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";

export const CategoriaPerros = () => {
  const [productos, setProductos] = useState<CatalogoProductoDto[]>([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productosPerPage = 10;

  useEffect(() => {
    async function getProductos() {
      try {
        const response = await fetch("http://107.21.145.167:5001/productos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("No pudimos obtener los productos");
          return;
        }

        const productosJson = await response.json();
        setProductos(productosJson);
      } catch (error) {
        console.log("Ocurrió un error al obtener los productos", error);
      }
    }

    getProductos();
  }, []);

  const handleAddToCart = (producto: CatalogoProductoDto) => {
    dispatch(addToCart({ ...producto, stockProducto: 1 }));
  };

  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentProductos = productos.slice(
    indexOfFirstProducto,
    indexOfLastProducto
  );

  const totalPages = Math.ceil(productos.length / productosPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <MainLayout>
      <div className={styles.banner_perro}>
        <img src={BannerPerro} alt="Banner-perro" />
      </div>
      <Container fluid>
        <Row className="justify-content-center pb-5 px-5">
          <Col xs={3} sm={3} md={3}>
            <Link to={"/alimentos-perro"}>
              <img src={AlimentoPerro} alt="Categoria-alimentos" />
            </Link>
          </Col>
          <Col xs={3} sm={3} md={3}>
            <img src={JuguetesPerro} alt="Categoria-Juguetes" />
          </Col>
          <Col xs={3} sm={3} md={3}>
            <img src={SaludPerro} alt="Categoria-Salud" />
          </Col>
        </Row>
        <Row className="justify-content-center mb-3">
          <Col md={6}>
            <h1 className={styles.titulo}>Imperdibles</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {currentProductos.map((producto) => (
            <Col
              xs={12}
              sm={6}
              md={3}
              lg={2}
              key={producto.id}
              className="mb-3 img-fluid mx-2"
            >
              <div className={styles.cardProducto}>
                <div className={styles.imgContainer}>
                  {producto.imagenesProducto &&
                  producto.imagenesProducto.length > 0 ? (
                    <Link to={`/detalle-productos/${producto.id}`}>
                      <img
                        src={producto.imagenesProducto[0].pathImagenProducto}
                        className="d-block img-fluid"
                        alt={`${producto.nombreProducto} imagen 1`}
                      />
                    </Link>
                  ) : (
                    <p>Imagen no disponible</p>
                  )}
                </div>
                <p className={styles.nom_producto}>{producto.nombreProducto}</p>
                <p className={styles.nom_precio}>
                  {formatPrice(producto.precioProducto)}
                </p>
                <div className={styles.buttonContainer}>
                  <Button
                    style={{
                      backgroundColor: "#F2B705",
                      width: "124px",
                      height: "44px",
                      padding: "12",
                      borderRadius: "32px",
                      color: "#222222",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                      fontWeight: "700",
                      border: "1px solid #FFC71D",
                    }}
                    onClick={() => handleAddToCart(producto)}
                  >
                    Añadir
                    <img
                      src={addIcon}
                      alt="Añadir"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "8px",
                      }}
                    />
                  </Button>
                  <Button
                    className="btn-detalle"
                    style={{
                      backgroundColor: "white",
                      width: "124px",
                      height: "44px",
                      padding: "12",
                      borderRadius: "32px",
                      marginTop: "8px",
                      color: "#363636",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                      fontWeight: "700",
                      border: "1px solid #FFC71D",
                    }}
                  >
                    Comparar
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Pagination
          className="d-flex justify-content-center align-items-center pb-5 pt-5"
          size="lg"
        >
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{}}
          />
          {paginationItems}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Container>
    </MainLayout>
  );
};

export default CategoriaPerros;
