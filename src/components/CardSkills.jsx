import {
  FaHtml5,
  FaCss3Alt,
  FaSquareJs,
  FaReact,
  FaSass,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa6";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const CardSkills = () => {
  // Define un array con los skills y sus iconos
  const skills = [
    { id: "html", name: "HTML 5", icon: <FaHtml5 /> },
    { id: "css", name: "CSS 3", icon: <FaCss3Alt /> },
    { id: "js", name: "JavaScript", icon: <FaSquareJs /> },
    { id: "react", name: "React JS", icon: <FaReact /> },
    { id: "sass", name: "Sass/Scss", icon: <FaSass /> },
    { id: "bootstrap", name: "BootStrap", icon: <FaBootstrap /> },
    { id: "git", name: "Git", icon: <FaGitAlt /> },
    { id: "github", name: "GitHub", icon: <FaGithub /> },
    { id: "react-native", name: "React Native", icon: <FaReact /> },
    { id: "figma", name: "Figma", icon: <FaFigma /> },
  ];

  // Define un array con las cualidades
  const qualities = [
    { id: "organized", name: "Organizado" },
    { id: "assertive", name: "Asertivo" },
    { id: "disciplined", name: "Disciplinado" },
    { id: "creative", name: "Creativo" },
    { id: "productive", name: "Productivo" },
    { id: "adaptable", name: "Adaptable" },
  ];

  return (
    <Row className="flex-column g-4">
      <Col>
        <Row className="gy-2">
          {skills.map((skill) => (
            <Col
              className="d-flex align-items-center pe-0"
              xs={6}
              md={4}
              key={skill.id}>
              <span className="p-0 mb-1 me-2 fs-2">{skill.icon}</span>{" "}
              <p className="p-0 m-0 fs-6 fw-semibold">{skill.name}</p>
            </Col>
          ))}
        </Row>
      </Col>
      <Col>
        <Row className="g-2">
          {qualities.map((quality) => (
            <Col xs={6} md={4} key={quality.id}>
              <p className="p-0 m-0 fs-6 fw-semibold">{quality.name}</p>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
