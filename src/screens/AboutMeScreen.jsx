import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import programming from "../assets/programming.svg";

export const AboutMeScreen = () => {
  return (
    <section id="AboutMe">
      <h2>Sobre mí</h2>
      <Row className="g-3 mt-4 px-2">
        <Col
          md={{ span: 10, offset: 1 }}
          lg={{ span: 4, offset: 1 }}
          className="d-flex justify-content-center align-items-center">
          <Image width={"80%"} src={programming} />
        </Col>
        <Col
          md={{ span: 10, offset: 1 }}
          lg={{ span: 6, offset: 1 }}
          className="d-flex flex-column justify-content-center align-items-center">
          <p className="text-primary fs-5 text-center">
            Me alegro de tenerte aquí!
          </p>
          <p>
            Soy un desarrollador de front-end con sede en{" "}
            <span className="text-primary">Lisboa, Portugal</span>. Mi pasión
            por el desarrollo web comenzó en mayo del 2020 cuando comencé a
            construir los retos propuestos en{" "}
            <a
              href="https://www.frontendmentor.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline-opacity-75 link-underline-primary link-primary">
              Frontend Mentor
            </a>{" "}
            con html y css.
          </p>
          <p>
            Desde entonces, he estado avanzando y expandiendo constantemente mi
            conocimiento en este campo. En octubre de 2020, sentí la necesidad
            de profundizar en el desarrollo web, lo que me llevó a aprender js y
            luego reactjs junto con otras tecnologías de diseño. Con cada
            proyecto, me esfuerzo por crear una{" "}
            <span className="text-primary">solución única y efectiva</span> al
            tiempo que integro las últimas tecnologías web.
          </p>
          <p>
            Siempre estoy emocionado de <span className="text-primary">colaborar</span> con personas y equipos que
            comparten mi <span className="text-primary">pasión</span> por crear experiencias web excepcionales.
          </p>
          <p className="text-primary text-center">
            ¡Gracias por tomarse el tiempo de visitar mi portafolio!
          </p>
        </Col>
      </Row>
    </section>
  );
};
