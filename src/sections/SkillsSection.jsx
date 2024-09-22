import { Row, Col } from "react-bootstrap";
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
            A lo largo del tiempo, he adquirido dominio en diversas tecnologías,
            gracias a la <span className="text-primary">educación online</span>,
            especialmente la ofrecida por{" "}
            <a
              href="https://platzi.com/p/gonzaloyacante/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline-opacity-75 link-underline-primary link-primary">
              Platzi
            </a>
            . Puedes revisar mi perfil para más detalles. También incluyo aquí
            las <span className="text-primary">certificaciones</span> que he
            obtenido, las cuales puedes verificar.
          </p>
          {/* <CertificationsModal /> */}
          <p>
            Además, tengo la capacidad de diseñar y desarrollar sitios web tanto{" "}
            <span className="text-primary">estáticos</span> como{" "}
            <span className="text-primary">dinámicos</span>, asegurando que sean
            completamente <span className="text-primary">responsivos</span> y{" "}
            <span className="text-primary">amigables para el usuario</span>. Soy
            competente en el seguimiento de proyectos mediante un{" "}
            <span className="text-primary">
              sistema de control de versiones
            </span>{" "}
            y estoy capacitado para trabajar en colaboración utilizando la{" "}
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
