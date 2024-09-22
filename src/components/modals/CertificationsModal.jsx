import { useState } from "react";
// useMemo
import { useFetch } from "../../hooks/useFetch";
// import { FaCircleInfo } from "react-icons/fa6";
import { Spinner, Modal, Button, Row, Col, Card } from "react-bootstrap";
// import Dropdown from "react-bootstrap/Dropdown";

export const CertificationsModal = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_TOKEN;

  const {
    data: certifications,
    isLoading,
    error,
  } = useFetch(apiUrl, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiToken}`,
    },
  });

  // const [order, setOrder] = useState(["date.desc", "Fecha (más reciente)"]);
  // const [platformFilter, setPlatformFilter] = useState("Todas");
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  // const [selectedCertification, setSelectedCertification] = useState(null);

  // const uniquePlatforms = useMemo(() => {
  //   if (!certifications) return [];
  //   return [...new Set(certifications.map((certification) => certification.platform))];
  // }, [certifications]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowSecondModal = () => {
    // setSelectedCertification(certification);
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
            Certificaciones - Total: {certifications?.length}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* El resto del contenido del modal permanece igual */}
          <Row className="g-3 d-flex justify-content-center align-items-center">
            {error && (
              <>
                <p>Lo siento, ocurrió un error al obtener los certificados</p>
                <p>Error: {error.message}</p>
              </>
            )}
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              certifications?.map((certification) => {
                {
                  /* const date = new Date(certification.date); */
                }
                {
                  /* const formattedDate = date
                  .toLocaleDateString("es-ES", {
                    month: "numeric",
                    year: "numeric",
                  })
                  .replace(/\//g, "-"); */
                }
                return (
                  <Col xs={6} md={4} lg={3} key={certification.id}>
                    <Card
                      style={{ cursor: "pointer" }}
                      onClick={() => handleShowSecondModal(certification)}
                      className="position-relative  text-center">
                      {/* El contenido de la tarjeta permanece igual */}
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
        {/* El contenido del segundo modal permanece igual */}
      </Modal>
    </>
  );
};
