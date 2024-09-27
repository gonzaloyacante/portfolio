import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "@formspree/react";
import { Button, Col, Form, Row } from "react-bootstrap";

export const ContactForm = ({ onSuccess }) => {
  const [validated, setValidated] = useState(false);
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);

  const handleChange = () => setValidated(true);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    if (state.succeeded) onSuccess();
  };
  return (
    <Form
      name="contact"
      onChange={handleChange}
      onSubmit={handleSubmitForm}
      className="w-100"
      noValidate
      validated={validated}>
      <Row>
        <Form.Group
          controlId="name"
          className="mb-3"
          as={Col}
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}>
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            name="name"
            required
            type="text"
            placeholder="Gonzalo Yacante"
          />
        </Form.Group>
        <Form.Group
          controlId="email"
          className="mb-3"
          as={Col}
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}>
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            name="email"
            required
            type="email"
            placeholder="ejemplo@correo.com"
          />
        </Form.Group>
        <Form.Group
          controlId="message"
          className="mb-3"
          as={Col}
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}>
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            name="message"
            required
            as="textarea"
            rows={4}
            placeholder="Explícame brevemente tu idea."
          />
        </Form.Group>
        <Col
          className="text-end mb-3"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}>
          <Button type="submit">Enviar</Button>
        </Col>
        {state.submitting && <p>Enviando mensaje...</p>}
        {state.errors && state.errors.length > 0 && (
          <p>Error al enviar mensaje, intenta nuevamente.</p>
        )}
      </Row>
    </Form>
  );
};

ContactForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
