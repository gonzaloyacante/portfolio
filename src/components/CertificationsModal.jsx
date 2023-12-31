import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

import { FaCircleInfo } from "react-icons/fa6";

import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

export const CertificationsModal = () => {
  const { certificationData, isLoading, error, uniquePlatforms } = useFetch();
  const [order, setOrder] = useState(["date.desc", "Fecha (más reciente)"]);
  const [platformFilter, setPlatformFilter] = useState("Todas");

  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowSecondModal = (certification) => {
    setSelectedCertification(certification);
    setShowSecondModal(true);
  };
  const handleCloseSecondModal = () => setShowSecondModal(false);

  return (
    <>
      <Button
        variant="outline-primary"
        className="mb-3"
        onClick={handleShowModal}>
        Certificaciones
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Certificaciones - Total: {certificationData?.length}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3 mb-3 text-center">
            <p className="p-0 m-0 mt-4 text-primary">
              Toca las imágenes para ver mas información
            </p>
            <p>
              <span>
                <FaCircleInfo />
              </span>
              {"  "}
              Las opciones de filtrar y ordenar estarán disponibles próximamente
              {"  "}
              <span>
                <FaCircleInfo />
              </span>
            </p>
            <Col className="p-0 m-0">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" align="end">
                  Ordenar: {order[1]}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      setOrder(["date.desc", "Fecha (más reciente)"])
                    }>
                    Fecha (más reciente)
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      setOrder(["date.asc", "Fecha (más antigua)"])
                    }>
                    Fecha (más antigua)
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setOrder(["name.asc", "Nombre (A-Z)"])}>
                    Nombre (A-Z)
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setOrder(["name.desc", "Nombre (Z-A)"])}>
                    Nombre (Z-A)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col className="p-0 m-0">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" align="center">
                  Plataforma: {platformFilter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    key="Todas"
                    onClick={() => setPlatformFilter("Todas")}>
                    Todas
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {uniquePlatforms?.map((platform) => (
                    <Dropdown.Item
                      key={platform}
                      onClick={() => setPlatformFilter(platform)}>
                      {platform}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row className="g-3 d-flex justify-content-center align-items-center">
            {error && (
              <>
                <p>Lo siento, ocurrió un error al obtener los certificados</p>
                <p>Error: {error}</p>
              </>
            )}
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              certificationData?.map((certification) => {
                const date = new Date(certification.date);
                const formattedDate = date
                  .toLocaleDateString("es-ES", {
                    month: "numeric",
                    year: "numeric",
                  })
                  .replace(/\//g, "-");
                return (
                  <Col xs={6} md={4} lg={3} key={certification.id}>
                    <Card
                      style={{ cursor: "pointer" }}
                      onClick={() => handleShowSecondModal(certification)}
                      className="position-relative  text-center">
                      <Card.Img
                        variant="top"
                        src={certification.image}
                        alt={certification.name}
                      />
                      <Card.Body className="custom-card-body">
                        <Card.Subtitle>{certification.tipo}</Card.Subtitle>
                        <FaCircleInfo className="position-absolute bottom-0 end-0 me-2 mb-5" />
                        <Card.Text className="custom-card-title">
                          {certification.name}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="d-flex justify-content-between w-100">
                        <small className="text-muted text-start">
                          {formattedDate}
                        </small>
                        <small className="text-muted text-end text-truncate w-50">
                          {certification.platform}
                        </small>
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>
        </Modal.Body>
      </Modal>
      <Modal
        show={showSecondModal}
        onHide={handleCloseSecondModal}
        size="lg"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCertification?.name}</Modal.Title>
        </Modal.Header>
        <Card.Img
          variant="top"
          src={selectedCertification?.image}
          alt={selectedCertification?.name}
        />
        <Modal.Body>
          <p>{selectedCertification?.date}</p>
          <p>{selectedCertification?.platform}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};
