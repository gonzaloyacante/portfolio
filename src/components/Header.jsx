import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../assets/code.png";

export const Header = () => {
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt={logo}
            src={logo}
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
          <Offcanvas.Body className="w-100 h-100">
            <Nav className="align-items-center justify-content-end flex-grow-1">
              <Nav.Link href="#Home">
                <p className="h5 d-none d-sm-block p-0 m-0">Home</p>
                <p className="h2 d-md-none p-0 my-1">Home</p>
              </Nav.Link>
              <Nav.Link href="#AboutME">
                <p className="h5 d-none d-sm-block p-0 m-0">Sobre mí</p>
                <p className="h2 d-md-none p-0 my-1">Sobre mí</p>
              </Nav.Link>
              <Nav.Link href="#Skills">
                <p className="h5 d-none d-sm-block p-0 m-0">Habilidades</p>
                <p className="h2 d-md-none p-0 my-1">Habilidades</p>
              </Nav.Link>
              <Nav.Link href="#Portfolio">
                <p className="h5 d-none d-sm-block p-0 m-0">Portafolio</p>
                <p className="h2 d-md-none p-0 my-1">Portafolio</p>
              </Nav.Link>
              <Nav.Link href="#Contact">
                <p className="h5 d-none d-sm-block p-0 m-0">Contáctame</p>
                <p className="h2 d-md-none p-0 my-1">Contáctame</p>
              </Nav.Link>
              <Nav.Link href="#Footer">
                <p className="h5 d-none d-sm-block p-0 m-0">Redes Sociales</p>
                <p className="h2 d-md-none p-0 my-1">Redes Sociales</p>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
