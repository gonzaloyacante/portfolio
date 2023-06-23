import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";


export const HomeScreen = () => {
  return (
    <Container fluid className="align-items-center justify-content-center d-flex flex-column min-vh-100">
      <h4>Hola, yo soy</h4>
      <h1 className="primary">Gonzalo Yacante</h1>
      <h5>Desarrollador Frontend</h5>

      <Stack direction="horizontal" gap={3} className="mx-auto mt-3">
        <Button variant="outline-primary">Descargar CV</Button>
        <Button variant="primary">Conóceme más</Button>
      </Stack>
      <Image
        width={200}
        src="./assets/astronaut_green.svg"
        className="float-end"
      />
    </Container>
  );
};
