import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";

import astronaut_green from "../assets/astronaut_green.svg";

export const HomeScreen = () => {
  return (
    <Container
      id="Home"
      fluid
      className="align-items-center justify-content-center d-flex flex-column min-vh-100">
      <p className="h5">Hola, yo soy</p>
      <h1 className="text-primary h1">
        <strong>Gonzalo Yacante</strong>
      </h1>
      <p className="h4">Desarrollador Frontend</p>

      <Stack direction="horizontal" gap={3} className="mx-auto mt-3">
        <Button variant="outline-primary">Descargar CV</Button>
        <Button variant="primary">Conóceme más</Button>
      </Stack>
      <Image width={200} src={astronaut_green} />
    </Container>
  );
};
