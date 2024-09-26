import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Stack,
  Image,
} from "react-bootstrap";
import { List } from "react-bootstrap-icons";

import { useState } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";

export const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <Navbar fixed="top" expand="lg" className="bg-body">
      <Container>
        <Navbar.Brand href="#Home">
          <Image
            className="d-inline-block align-top"
            width="30"
            height="30"
            src="https://imgur.com/zYhsUB2.png"
            alt="Logo de la Web."
          />
        </Navbar.Brand>
        <Stack
          className="flex-row flex-lg-row-reverse"
          direction="horizontal"
          gap={2}>
          <ThemeToggle
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
          />
          <Navbar.Toggle className="border-0" aria-controls="basic-navbar-nav">
            <List size={30} color={isDarkTheme ? "black" : "white"} />
          </Navbar.Toggle>
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
                  <p className="d-none d-sm-block px-2 m-0">Home</p>
                  <p className="h2 d-md-none p-0 my-1">Home</p>
                </Nav.Link>
                <Nav.Link href="#AboutMe">
                  <p className="d-none d-sm-block px-2 m-0">Sobre mí</p>
                  <p className="h2 d-md-none p-0 my-1">Sobre mí</p>
                </Nav.Link>
                <Nav.Link href="#Skills">
                  <p className="d-none d-sm-block px-2 m-0">Habilidades</p>
                  <p className="h2 d-md-none p-0 my-1">Habilidades</p>
                </Nav.Link>
                <Nav.Link href="#Projects">
                  <p className="d-none d-sm-block px-2 m-0">Proyectos</p>
                  <p className="h2 d-md-none p-0 my-1">Proyectos</p>
                </Nav.Link>
                <Nav.Link href="#Contact">
                  <p className="d-none d-sm-block px-2 m-0">Contáctame</p>
                  <p className="h2 d-md-none p-0 my-1">Contáctame</p>
                </Nav.Link>
                <Nav.Link href="#Footer">
                  <p className="d-none d-sm-block px-2 m-0">Redes Sociales</p>
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
