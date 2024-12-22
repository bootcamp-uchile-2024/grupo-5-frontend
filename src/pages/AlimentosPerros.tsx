import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../states/cartSlice";
import { CatalogoProductoDto } from "../interface/Productos/dto/CatalogoProductoDto";
import styles from "./css/AlimentosPerros.module.css";
import addIcon from "../assets/icons/icono_carrito.svg";
import BannerPerro from "../assets/Banner/perros.png";
import AlimentoPerro from "../assets/Categorias/alimentos_perro.png";
import JuguetesPerro from "../assets/Categorias/juguetes_perro.png";
import SaludPerro from "../assets/Categorias/salud_perro.png";
import { Container, Row, Col, Button, Pagination, Form } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";
import { RootState } from "../states/store";
import {
  setMarcaFilter,
  setTipoFilter,
  setEdadFilter,
  setOrdenarFilter,
  clearFilters,
} from "../states/filtersSlice";

export const AlimentosPerros = () => {
  const [productos, setProductos] = useState<CatalogoProductoDto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<
    CatalogoProductoDto[]
  >([]);
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [currentPage, setCurrentPage] = useState(1);
  const productosPerPage = 15;

  // Estado local para los filtros seleccionados
  const [selectedMarca, setSelectedMarca] = useState<string[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<string[]>([]);
  const [selectedEdad, setSelectedEdad] = useState<string[]>([]);
  const [selectedOrdenar, setSelectedOrdenar] = useState<string>("");

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
        setFilteredProductos(productosJson);
      } catch (error) {
        console.log("Ocurrió un error al obtener los productos", error);
      }
    }

    getProductos();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = productos;

    if (filters.marca.length > 0) {
      filtered = filtered.filter((producto) =>
        filters.marca.includes(producto.marcaProducto)
      );
    }

    // if (filters.tipo.length > 0) {
    //   filtered = filtered.filter((producto) =>
    //     filters.tipo.includes(producto.TipoProducto)
    //   );
    // }

    // if (filters.edad.length > 0) {
    //   filtered = filtered.filter((producto) =>
    //     filters.edad.includes(producto.EdadProducto)
    //   );
    // }

    if (filters.ordenar) {
      switch (filters.ordenar) {
        case "A-Z":
          filtered = filtered.sort((a, b) =>
            a.nombreProducto.localeCompare(b.nombreProducto)
          );
          break;
        case "Z-A":
          filtered = filtered.sort((a, b) =>
            b.nombreProducto.localeCompare(a.nombreProducto)
          );
          break;
        case "PrecioMenor":
          filtered = filtered.sort(
            (a, b) => a.precioProducto - b.precioProducto
          );
          break;
        case "PrecioMayor":
          filtered = filtered.sort(
            (a, b) => b.precioProducto - a.precioProducto
          );
          break;
        default:
          break;
      }
    }

    setFilteredProductos(filtered);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case "marca":
        setSelectedMarca((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "tipo":
        setSelectedTipo((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "edad":
        setSelectedEdad((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "ordenar":
        setSelectedOrdenar(value);
        dispatch(setOrdenarFilter(value)); // Aplicar el filtro de ordenación directamente
        break;
      default:
        break;
    }
  };

  const applySelectedFilters = () => {
    dispatch(setMarcaFilter(selectedMarca));
    dispatch(setTipoFilter(selectedTipo));
    dispatch(setEdadFilter(selectedEdad));
    dispatch(setOrdenarFilter(selectedOrdenar));
  };

  const clearAllFilters = () => {
    setSelectedMarca([]);
    setSelectedTipo([]);
    setSelectedEdad([]);
    setSelectedOrdenar("");
    dispatch(clearFilters());
    setFilteredProductos(productos);
  };

  const handleAddToCart = (producto: CatalogoProductoDto) => {
    dispatch(addToCart({ ...producto, stockProducto: 1 }));
  };

  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentProductos = filteredProductos.slice(
    indexOfFirstProducto,
    indexOfLastProducto
  );

  const totalPages = Math.ceil(filteredProductos.length / productosPerPage);

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
            <img src={AlimentoPerro} alt="Categoria-alimentos" />
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
            <h1 className={styles.titulo}>Alimentos</h1>
          </Col>
        </Row>
        <Row className=" d-flex justify-content-center">
          <Col md={3} style={{ width: "279px" }}>
            <h2>Filtros</h2>
            <Row className="pb-3 pt-0">
              <p className={styles.categoria_filtros}>Marca</p>
              <Form.Check
                type="checkbox"
                label="Royal Canin"
                onChange={() => handleFilterChange("marca", "Royal Canin")}
                checked={selectedMarca.includes("Royal Canin")}
              />
              <Form.Check
                type="checkbox"
                label="Brit"
                onChange={() => handleFilterChange("marca", "Brit")}
                checked={selectedMarca.includes("Brit")}
              />
              <Form.Check
                type="checkbox"
                label="Acana"
                onChange={() => handleFilterChange("marca", "Acana")}
                checked={selectedMarca.includes("Acana")}
              />
              <Form.Check
                type="checkbox"
                label="Pro Plan"
                onChange={() => handleFilterChange("marca", "Pro Plan")}
                checked={selectedMarca.includes("Pro Plan")}
              />
              <Form.Check
                type="checkbox"
                label="Taste of the Wild"
                onChange={() =>
                  handleFilterChange("marca", "Taste of the Wild")
                }
                checked={selectedMarca.includes("Taste of the Wild")}
              />
              <Form.Check
                type="checkbox"
                label="Orijen"
                onChange={() => handleFilterChange("marca", "Orijen")}
                checked={selectedMarca.includes("Orijen")}
              />
              <Form.Check
                type="checkbox"
                label="Nutrience"
                onChange={() => handleFilterChange("marca", "Nutrience")}
                checked={selectedMarca.includes("Nutrience")}
              />
            </Row>

            <Row className="pb-3 pt-0">
              <p className={styles.categoria_filtros}>Tipo de alimento</p>
              <Form.Check
                type="checkbox"
                label="Húmedo"
                onChange={() => handleFilterChange("tipo", "Húmedo")}
                checked={selectedTipo.includes("Húmedo")}
              />
              <Form.Check
                type="checkbox"
                label="Seco"
                onChange={() => handleFilterChange("tipo", "Seco")}
                checked={selectedTipo.includes("Seco")}
              />
              <Form.Check
                type="checkbox"
                label="Mixto"
                onChange={() => handleFilterChange("tipo", "Mixto")}
                checked={selectedTipo.includes("Mixto")}
              />
              <Form.Check
                type="checkbox"
                label="BARF"
                onChange={() => handleFilterChange("tipo", "BARF")}
                checked={selectedTipo.includes("BARF")}
              />
            </Row>

            <Row className="pb-3 pt-0">
              <p className={styles.categoria_filtros}>Edad</p>
              <Form.Check
                type="checkbox"
                label="Cachorro"
                onChange={() => handleFilterChange("edad", "Cachorro")}
                checked={selectedEdad.includes("Cachorro")}
              />
              <Form.Check
                type="checkbox"
                label="Adulto"
                onChange={() => handleFilterChange("edad", "Adulto")}
                checked={selectedEdad.includes("Adulto")}
              />
              <Form.Check
                type="checkbox"
                label="Senior"
                onChange={() => handleFilterChange("edad", "Senior")}
                checked={selectedEdad.includes("Senior")}
              />
            </Row>

            <Row className="pb-3 pt-0">
              <p className={styles.categoria_filtros}>Ordenar</p>
              <Form.Check
                type="radio"
                label="De la A a la Z"
                name="ordenar"
                onChange={() => handleFilterChange("ordenar", "A-Z")}
                checked={filters.ordenar === "A-Z"}
              />
              <Form.Check
                type="radio"
                label="De la Z a la A"
                name="ordenar"
                onChange={() => handleFilterChange("ordenar", "Z-A")}
                checked={filters.ordenar === "Z-A"}
              />
              <Form.Check
                type="radio"
                label="Precio menor primero"
                name="ordenar"
                onChange={() => handleFilterChange("ordenar", "PrecioMenor")}
                checked={filters.ordenar === "PrecioMenor"}
              />
              <Form.Check
                type="radio"
                label="Precio mayor primero"
                name="ordenar"
                onChange={() => handleFilterChange("ordenar", "PrecioMayor")}
                checked={filters.ordenar === "PrecioMayor"}
              />
              <Form.Check
                type="radio"
                label="Más vendidos"
                name="ordenar"
                onChange={() => handleFilterChange("ordenar", "MasVendidos")}
                checked={filters.ordenar === "MasVendidos"}
              />
              <Form.Check
                type="radio"
                label="Recomendados"
                name="ordenar"
                onChange={() => handleFilterChange("ordenar", "Recomendados")}
                checked={filters.ordenar === "Recomendados"}
              />
            </Row>

            <div className="d-flex flex-column align-items-center mt-3">
              <Button
                onClick={applySelectedFilters}
                style={{
                  backgroundColor: "#F2B705",
                  width: "144px",
                  height: "40px",
                  padding: "8px",
                  borderRadius: "32px",
                  color: "#363636",
                  fontSize: "16px",
                  fontFamily: "Montserrat",
                  fontWeight: "500",
                  border: "1px solid #FFC71D",
                  marginBottom: "10px",
                }}
              >
                Aplicar Filtros
              </Button>
              <Button
                onClick={clearAllFilters}
                style={{
                  backgroundColor: "white",
                  width: "144px",
                  height: "40px",
                  padding: "8px",
                  borderRadius: "32px",
                  color: "#363636",
                  fontSize: "16px",
                  fontFamily: "Montserrat",
                  fontWeight: "500",
                  border: "1px solid #535353",
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          </Col>

          <Col md={9}>
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
                            src={
                              producto.imagenesProducto[0].pathImagenProducto
                            }
                            className="d-block img-fluid"
                            alt={`${producto.nombreProducto} imagen 1`}
                          />
                        </Link>
                      ) : (
                        <p>Imagen no disponible</p>
                      )}
                    </div>
                    <p className={styles.nom_producto}>
                      {producto.nombreProducto}
                    </p>
                    <p className={styles.nom_precio}>
                      ${producto.precioProducto}
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
          </Col>
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

export default AlimentosPerros;
