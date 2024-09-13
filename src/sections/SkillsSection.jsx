import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CardSkills } from "../components/ui/CardSkills";
// import { CertificationsModal } from "../components/modals/CertificationsModal";

export const SkillsSection = () => {
  return (
    <section className="my-5" id="Skills">
      <h2>Habilidades</h2>
      <Row className="mt-4 px-2">
        <Col
          className="d-flex flex-column justify-content-center align-items-center"
          md={{ span: 10, offset: 1 }}
          lg={{ span: 6, offset: 1 }}>
          <p>
            Durante el paso del tiempo, he podido dominar algunas tecnologías,
            esto ha sido posible gracias a la{" "}
            <span className="text-primary">educación online</span>,
            principalmente la que{" "}
            <a
              href="https://platzi.com/p/gonzaloyacante/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline-opacity-75 link-underline-primary link-primary">
              Platzi
            </a>{" "}
            ofrece, puedes comprobar mi perfil en caso de que desees. También
            dejo acá las <span className="text-primary">certificaciones</span>{" "}
            que he obtenido, siéntete libre de verificar su fuente.
          </p>
          {/* <CertificationsModal /> */}
          <p>
            Dejando esto de lado, soy capaz de diseñar y de crear sitios web
            estáticos o dinámicos que sean completamente{" "}
            <span className="text-primary">responsivos</span> y amigables con el
            usuario, puedo llevar el seguimiento de los proyectos mediante un{" "}
            <span className="text-primary">
              sistema de control de versiones
            </span>
            , y además, estoy capacitado para trabajar colaborando con la{" "}
            <span className="text-primary">metodología Scrum</span>.
          </p>
        </Col>
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 0 }}>
          <CardSkills />
        </Col>
      </Row>
    </section>
  );
};
