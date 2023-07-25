import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import mello from "../assets/mello.svg";

export const HomeScreen = () => {
  return (
    <Container
      id="Home"
      fluid
      className="align-items-center justify-content-center d-flex flex-column min-vh-100">
      <p className="fs-5 m-1">Hola, yo soy</p>
      <h1 className="text-primary fs-1">
        <strong>Gonzalo Yacante</strong>
      </h1>
      <p className="fs-4">Desarrollador Frontend</p>

      <Button variant="outline-primary">
        Descargar CV
      </Button>
      <Image width={300} src={mello} alt="Imagen de Mello." />
    </Container>
  );
};
