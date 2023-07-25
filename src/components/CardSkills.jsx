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
  FaChartSimple,
  FaListCheck,
  FaHand,
  FaStopwatch,
  FaLightbulb,
  FaChartPie,
  FaArrowsTurnToDots,
  FaDatabase
} from "react-icons/fa6";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const CardSkills = () => {
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
    { id: "seo", name: "SEO", icon: <FaChartSimple /> },
    { id: "supabase", name: "SupaBase", icon: <FaDatabase /> },
  ];

  const qualities = [
    { id: "organized", name: "Organizado", icon: <FaListCheck /> },
    { id: "assertive", name: "Asertivo", icon: <FaHand /> },
    { id: "disciplined", name: "Disciplinado", icon: <FaStopwatch /> },
    { id: "creative", name: "Creativo", icon: <FaLightbulb /> },
    { id: "productive", name: "Productivo", icon: <FaChartPie /> },
    { id: "adaptable", name: "Adaptable", icon: <FaArrowsTurnToDots /> },
  ];

  return (
    <Row className="flex-column g-0">
      <Col className="mb-3">
        <Row className="gy-2">
          {skills.map((skill) => (
            <Col
              className="d-flex align-items-center pe-0"
              xs={6}
              md={4}
              key={skill.id}>
              <span className="p-0 mb-2 me-2 fs-2">{skill.icon}</span>{" "}
              <p className="p-0 m-0 fs-6 fw-semibold">{skill.name}</p>
            </Col>
          ))}
        </Row>
      </Col>
      <hr />
      <Col>
        <Row className="gy-2">
          {qualities.map((quality) => (
            <Col
              className="d-flex align-items-center pe-0"
              xs={6}
              md={4}
              key={quality.id}>
              <span className="p-0 mb-2 me-2 fs-2">{quality.icon}</span>{" "}
              <p className="p-0 m-0 fs-6 fw-semibold">{quality.name}</p>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
