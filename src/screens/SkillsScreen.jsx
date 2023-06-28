import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CardSkills } from "../components/CardSkills";

export const SkillsScreen = () => {
  return (
    <section className="my-5" id="Skills">
      <h2>Habilidades</h2>
      <Container className="text-align-center mt-4">
        <Row>
          <Col md={{span: 10, offset: 1}} lg={{span: 6, offset: 1}}>
            <p>
              Durante el paso del tiempo, he podido dominar algunas tecnologías,
              y esto ha sido posible gracias a la{" "}
              <span className="text-primary">educación online</span>,
              principalmente la que <span className="text-primary">Platzi</span>{" "}
              ofrece. Puedes comprobar mi perfil en caso de que desees. También
              dejo acá las <span className="text-primary">certificaciones</span>{" "}
              que he obtenido, siéntete libre de verificar su fuente.
            </p>
            <Stack direction="horizontal" gap={3} className="justify-content-center my-4">
              <Button href="https://platzi.com/p/gonzaloyacante/" variant="outline-primary">Ver perfil</Button>
              <Button href="#AboutMe" variant="primary">
                Certificaciones
              </Button>
            </Stack>
            <p>
              Dejando esto de lado, soy capaz de diseñar y de crear sitios web
              estáticos o dinámicos que sean completamente{" "}
              <span className="text-primary">responsivos</span> y amigables con
              el usuario, puedo llevar el seguimiento de los proyectos mediante
              un{" "}
              <span className="text-primary">
                sistema de control de versiones
              </span>
              , y además, estoy capacitado para trabajar colaborando con la{" "}
              <span className="text-primary">metodología Scrum</span>.
            </p>
          </Col>
          <Col md={{span: 10, offset: 1}} lg={{span: 4, offset: 0}}>
            <CardSkills />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
