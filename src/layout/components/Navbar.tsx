import { Nav } from "react-bootstrap";

export const Navbar = () => {
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
          href="/categoria-perro"
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
