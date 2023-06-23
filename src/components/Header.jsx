import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../public/assets/code.png";

export const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt={logo}
            src="./assets/code.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          GY
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header className="w-100" closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              <h2 className="p-0 m-0">Menú</h2>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="w-100">
            <Nav className="align-items-center flex-grow-1">
              <Nav.Link href="#action1">
                <h5 className="p-0 m-0">Home</h5>
              </Nav.Link>
              <Nav.Link href="#action2">
                <h5 className="p-0 m-0">Sobre mí</h5>
              </Nav.Link>
              <Nav.Link href="#action3">
                <h5 className="p-0 m-0">Habilidades</h5>
              </Nav.Link>
              <Nav.Link href="#action4">
                <h5 className="p-0 m-0">Portafolio</h5>
              </Nav.Link>
              <Nav.Link href="#action5">
                <h5 className="p-0 m-0">Contáctame</h5>
              </Nav.Link>
              <Nav.Link href="#action6">
                <h5 className="p-0 m-0">Redes Sociales</h5>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
