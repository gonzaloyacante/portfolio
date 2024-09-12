import { Container, Row, Col, Card } from "react-bootstrap";
import { Folder, BoxArrowUpRight, Github } from "react-bootstrap-icons";
import { useFetch } from "../hooks/useFetch";

export const ProjectsSection = () => {
  const {
    data: repos,
    isLoading,
    error,
  } = useFetch("https://api.github.com/users/gonzaloyacante/repos");

  if (isLoading) return <div className="text-white">Cargando proyectos...</div>;
  if (error) return <div className="text-white">{error.message}</div>;

  return (
    <section className="my-5" id="Projects">
      <h2 className="mb-4">Proyectos</h2>
      <Container fluid>
        <Row xs={1} md={2} lg={3} className="g-4">
          {repos?.map((repo) => (
            <Col key={repo.id}>
              <Card className="project-card">
                <Card.Body>
                  <Folder className="folder-icon" />
                  <div className="action-icons">
                    <Github
                      onClick={() => window.open(repo.html_url, "_blank")}
                    />
                    <BoxArrowUpRight
                      onClick={() =>
                        window.open(repo.homepage || repo.html_url, "_blank")
                      }
                    />
                  </div>
                  <Card.Title>{repo.name}</Card.Title>
                  <Card.Text>{repo.description || "Sin descripción"}</Card.Text>
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
      </Container>
    </section>
  );
};
