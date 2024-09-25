import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Folder, BoxArrowUpRight, Github } from "react-bootstrap-icons";

export const ProjectsSection = () => {
  const {
    data: repos,
    isLoading,
    error,
  } = useFetch("https://api.github.com/users/gonzaloyacante/repos");

  const [showMoreCount, setShowMoreCount] = useState(6);

  const handleShowMore = () => {
    setShowMoreCount((prevCount) => Math.min(prevCount + 6, repos?.length));
  };

  if (isLoading) return <div className="text-white">Cargando proyectos...</div>;
  if (error) return <div className="text-white">{error.message}</div>;

  return (
    <section className="my-5" id="Projects">
      <h2 className="mb-4">Proyectos</h2>
      <Container fluid>
        <Row xs={1} md={2} lg={3} className="g-4">
          {repos?.slice(0, showMoreCount).map((repo) => (
            <Col key={repo.id}>
              <Card className="project-card h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <Folder className="fs-4 text-primary" />
                  <div className="action-icons fs-4 h-auto m-0 p-0">
                    <Github
                      onClick={() => window.open(repo.html_url, "_blank")}
                    />
                    <BoxArrowUpRight
                      onClick={() =>
                        window.open(repo.homepage || repo.html_url, "_blank")
                      }
                    />
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-primary">
                    {repo.name}
                  </Card.Title>
                  <Card.Text className="m-0">
                    {repo.description || "Sin descripción"}
                  </Card.Text>
                  <div className="technologies">
                    {repo.topics &&
                      repo.topics.map((topic, index) => (
                        <span key={index} className="technology-tag">
                          {topic}
                        </span>
                      ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {showMoreCount < repos?.length && (
          <div className="text-center mt-4">
            <Button variant="primary" size="sm" onClick={handleShowMore}>
              Mostrar {Math.min(6, repos?.length - showMoreCount)} más
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};
