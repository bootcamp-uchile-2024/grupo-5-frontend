import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigateToCategoriaPerro = () => {
    navigate("/categoria-perro");
  };

  return (
    <Nav
      className="d-flex justify-content-between"
      variant="underline"
      defaultActiveKey="/"
    >
      <Nav.Item>
        <Nav.Link
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: "700",
            borderBottom: "none",
          }}
          href=""
        >
          Gatos
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: "700",
            borderBottom: "none",
          }}
          onClick={handleNavigateToCategoriaPerro}
        >
          Perros
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: "700",
            borderBottom: "none",
          }}
          href=""
        >
          Exóticos
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: "700",
            borderBottom: "none",
          }}
          href=""
        >
          Ofertas
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: "700",
            borderBottom: "none",
          }}
          href=""
        >
          Marcas
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: "700",
            borderBottom: "none",
          }}
          href=""
        >
          Nosotros
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: "700",
            borderBottom: "none",
          }}
          href=""
        >
          Blog
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: "700",
            borderBottom: "none",
          }}
          href=""
        >
          Ayuda
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
