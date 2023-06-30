import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { certifications } from "../data/certifications"; // Importa el array certifications desde el archivo data/certifications.js

export const CertificationsModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowImage = (image) => setSelectedImage(image);
  const handleCloseImage = () => setSelectedImage(null);

  // Extrae las escuelas y plataformas únicas de la base de datos
  const schools = [
    ...new Set(certifications.map((certification) => certification.school)),
  ];
  const platforms = [
    ...new Set(certifications.map((certification) => certification.platform)),
  ];

  // Filtrar las certificaciones por escuela y plataforma seleccionadas
  const filteredCertifications = certifications.filter(
    (certification) =>
      (selectedSchool === "" || certification.school === selectedSchool) &&
      (selectedPlatform === "" || certification.platform === selectedPlatform)
  );

  // Ordenar las certificaciones por título en el orden seleccionado
  const sortedCertifications = [...filteredCertifications].sort((a, b) =>
    sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <>
      <Button onClick={handleShowModal}>Certificaciones</Button>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Certificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-3 mb-3">
              <Col>
                <Form.Label>Escuela</Form.Label>
                <Form.Select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}>
                  <option value="">Todas</option>
                  {/* Reemplaza esto con tus propias escuelas */}
                  {schools.map((school) => (
                    <option key={school}>{school}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Plataforma</Form.Label>
                <Form.Select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}>
                  <option value="">Todas</option>
                  {/* Reemplaza esto con tus propias plataformas */}
                  {platforms.map((platform) => (
                    <option key={platform}>{platform}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Ordenar por</Form.Label>
                <Form.Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="asc">Título (ascendente)</option>
                  <option value="desc">Título (descendente)</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
          <Row className="g-3">
            {sortedCertifications.map((certification) => (
              <Col xs={6} md={4} lg={3} key={certification.title}>
                <Card onClick={() => handleShowImage(certification.image)}>
                  <Card.Img
                    variant="top"
                    src={certification.image}
                    alt={certification.title}
                  />
                  <Card.Body>
                    <Card.Title className="text-truncate">
                      {certification.title}
                    </Card.Title>
                    <Card.Text>
                      {`${
                        months[certification.date.getMonth()]
                      } ${certification.date.getFullYear()}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>

      <Modal show={selectedImage !== null} onHide={handleCloseImage} centered>
        <Modal.Body>
          <Card>
            <Card.Img variant="top" src={selectedImage} />
            <Card.Body>
              <Card.Text>
                Some
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};
