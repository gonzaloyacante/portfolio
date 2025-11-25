import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaRegFolder, FaGithub, FaLink } from "react-icons/fa6";
import { LoadingOrError } from "../components/ui/LoadingOrError";
import { Section } from "../components/layout/Section";

export const ProjectsSection = () => {
  const {
    data: repos,
    isLoading,
    error,
  } = useFetch("https://api.github.com/users/gonzaloyacante/repos");
  const [showMoreCount, setShowMoreCount] = useState(6);

  const handleShowMore = () => {
    setShowMoreCount((prevCount) =>
      Math.min(prevCount + 6, repos?.length || 0)
    );
  };

  return (
    <Section title="Proyectos" id="Projects">
      <LoadingOrError isLoading={isLoading} error={error}>
        <Row xs={1} md={2} lg={3} className="g-4">
          {repos
            ?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            ?.slice(0, showMoreCount)
            ?.map(({ id, name, description, html_url, homepage, topics }) => (
              <Col key={id}>
                <Card className="project-card h-100 animate__animated animate__zoomIn">
                  <Card.Header className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2 fs-4 text-primary">
                      <FaRegFolder className="" />
                      <Card.Title className="text-capitalize m-0">
                        {name}
                      </Card.Title>
                    </div>
                    <div className="action-icons fs-4">
                      <FaGithub
                        aria-label="Ver en Github"
                        onClick={() => window.open(html_url, "_blank")}
                      />
                      <FaLink
                        aria-label="Link al proyecto"
                        onClick={() =>
                          window.open(homepage || html_url, "_blank")
                        }
                      />
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{description || "Sin descripción"}</Card.Text>
                    <div>
                      {topics?.map((topic, index) => (
                        <Badge
                          key={index}
                          bg="secondary"
                          text="primary"
                          className="text-capitalize">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </LoadingOrError>

      {/* Botón para mostrar más proyectos */}
      {showMoreCount < (repos?.length || 0) && !error && (
        <Button
          className="mt-4"
          variant="primary"
          size="sm"
          onClick={handleShowMore}>
          Mostrar {Math.min(6, repos?.length - showMoreCount)} más
        </Button>
      )}
    </Section>
  );
};
