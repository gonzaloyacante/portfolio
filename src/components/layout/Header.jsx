import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Stack from "react-bootstrap/Stack";

import { ThemeToggle } from "../ui/ThemeToggle";

import logo from "../../assets/code.png";

export const Header = () => {
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#Home">
          <img
            alt={logo}
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          GY
        </Navbar.Brand>
        <Stack
          className="flex-row flex-lg-row-reverse"
          direction="horizontal"
          gap={3}>
          <ThemeToggle />
          <Navbar.Toggle
            className="border-0 shadow-sm bg-body-tertiary rounded"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end">
            <Offcanvas.Header className="w-100 px-4" closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <p className="h1 p-0 m-0">Menú</p>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="w-100 h-100">
              <Nav className="align-items-center justify-content-end flex-grow-1">
                <Nav.Link href="#Home">
                  <p className="6 d-none d-sm-block px-2 m-0">Home</p>
                  <p className="h2 d-md-none p-0 my-1">Home</p>
                </Nav.Link>
                <Nav.Link href="#AboutMe">
                  <p className="6 d-none d-sm-block px-2 m-0">Sobre mí</p>
                  <p className="h2 d-md-none p-0 my-1">Sobre mí</p>
                </Nav.Link>
                <Nav.Link href="#Skills">
                  <p className="6 d-none d-sm-block px-2 m-0">Habilidades</p>
                  <p className="h2 d-md-none p-0 my-1">Habilidades</p>
                </Nav.Link>
                <Nav.Link href="#Portfolio">
                  <p className="6 d-none d-sm-block px-2 m-0">Portafolio</p>
                  <p className="h2 d-md-none p-0 my-1">Portafolio</p>
                </Nav.Link>
                <Nav.Link href="#Contact">
                  <p className="6 d-none d-sm-block px-2 m-0">Contáctame</p>
                  <p className="h2 d-md-none p-0 my-1">Contáctame</p>
                </Nav.Link>
                <Nav.Link href="#Footer">
                  <p className="6 d-none d-sm-block px-2 m-0">Redes Sociales</p>
                  <p className="h2 d-md-none p-0 my-1">Redes Sociales</p>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Stack>
      </Container>
    </Navbar>
  );
};
