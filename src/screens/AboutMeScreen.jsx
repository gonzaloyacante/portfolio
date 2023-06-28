import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import programming from "../assets/programming.svg";

export const AboutMeScreen = () => {
  return (
    <section id="AboutMe">
      <h2>Sobre mí</h2>
      <Row className="g-3">
        <Col
          md={12}
          lg={4}
          className="d-flex justify-content-center align-items-center">
          <Image width={"80%"} src={programming} />
        </Col>
        <Col md={12} lg={8} className="text-center text-lg-start">
          <p className="text-primary">Hola, me alegro de tenerte aquí!</p>
          <p>
            Mi nombre es Gonzalo y soy un desarrollador de front-end con sede en
            Lisboa, Portugal. Mi pasión por el desarrollo web comenzó en mayo
            del 2020 cuando comencé a construir los retos propuestos en{" "}
            <a
              href="https://www.frontendmentor.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline-opacity-75 link-underline-primary">
              Frontend Mentor
            </a>{" "}
            con html y css.
          </p>
          <p>
            Desde entonces, he estado avanzando y expandiendo constantemente mi
            conocimiento en este campo. En octubre de 2020, sentí la necesidad
            de profundizar en el desarrollo web, lo que me llevó a aprender js y
            luego reactjs junto con otras tecnologías de diseño. Con cada
            proyecto, me esfuerzo por crear una solución única y efectiva al
            tiempo que integro las últimas tecnologías web.
          </p>
          <p>
            Siempre estoy emocionado de colaborar con personas y equipos que
            comparten mi pasión por crear experiencias web excepcionales.
          </p>
          <p className="text-primary">
            ¡Gracias por tomarse el tiempo de visitar mi portafolio!
          </p>
        </Col>
      </Row>
    </section>
  );
};
