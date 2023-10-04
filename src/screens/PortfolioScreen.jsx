import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const PortfolioScreen = () => {
  return (
    <section className="my-5" id="Skills">
      <h2>Proyectos</h2>
      <Row className="mt-4 px-2">
        <Col className="text-center">
          <p>
            Por el momento solo puedes ver mis proyectos en mi perfil de github
          </p>
          <Button href="https://github.com/gonzaloyacante" target="_blank" variant="outline-primary">Perfil de GitHub</Button>
        </Col>
      </Row>
    </section>
  );
};
