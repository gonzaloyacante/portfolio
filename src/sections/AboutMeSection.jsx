import { Image, Col, Row } from "react-bootstrap";

export const AboutMeSection = () => {
  return (
    <section id="AboutMe">
      <h2>Sobre mí</h2>
      <Row className="g-3 mt-4 px-2">
        <Col
          md={{ span: 10, offset: 1 }}
          lg={{ span: 4, offset: 1 }}
          className="d-flex justify-content-center align-items-center">
          <Image
            width={"80%"}
            src="https://imgur.com/gK3qHm6.png"
            alt="Imagen de un programador."
          />
        </Col>
        <Col
          md={{ span: 10, offset: 1 }}
          lg={{ span: 6, offset: 1 }}
          className="d-flex flex-column justify-content-center align-items-center">
          <p className="text-primary fs-5 text-center">
            ¡Me alegro de tenerte aquí!
          </p>
          <p>
            Soy un desarrollador front-end con sede en{" "}
            <span className="text-primary">Lisboa, Portugal</span>,
            especializado en <span className="text-primary">React</span>. Mi
            carrera en el desarrollo web comenzó en 2020, y desde entonces he
            estado dedicándome a perfeccionar mis habilidades y a mantenerme al
            día con las{" "}
            <span className="text-primary">
              últimas tendencias tecnológicas
            </span>
            .
          </p>
          <p>
            Mi enfoque se centra en crear{" "}
            <span className="text-primary">
              aplicaciones web dinámicas y eficientes
            </span>{" "}
            utilizando React y otras tecnologías modernas. Me apasiona resolver
            <span className="text-primary"> problemas complejos </span> y
            transformar ideas en{" "}
            <span className="text-primary">
              soluciones digitales innovadoras
            </span>
            .
          </p>
          <p>
            Disfruto trabajando en equipo y colaborando con otros profesionales
            para crear{" "}
            <span className="text-primary">experiencias web excepcionales</span>{" "}
            que no solo cumplen con los requisitos del cliente, sino que también
            superan sus expectativas.
          </p>
          <p className="text-primary text-center">
            ¡Gracias por visitar mi portafolio!
          </p>
        </Col>
      </Row>
    </section>
  );
};
