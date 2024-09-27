import { useState } from "react";
import { useForm } from "@formspree/react";

import { ArrowRight, Check, ExclamationTriangle } from "react-bootstrap-icons";

import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Section } from "../components/layout/Section";

export const ContactSection = () => {
  const [validated, setValidated] = useState(false);
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);

  const handleChange = () => {
    setValidated(true);
  };

  return (
    <Section title="Contáctame" id="Contact">
      <Form
        name="contact"
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="w-100"
        validated={validated}>
        <Row>
          <input type="hidden" name="form-name" value="contact" />
          <Form.Group
            className="mb-3"
            as={Col}
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
            controlId="name">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              placeholder="Gonzalo Yacante"
            />
            <Form.Control.Feedback>Suena bien!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3"
            as={Col}
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
            controlId="email">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              name="email"
              required
              type="email"
              placeholder="ejemplo@correo.com"
            />
            <Form.Control.Feedback>Perfecto!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3"
            as={Col}
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
            controlId="message">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              name="message"
              required
              as="textarea"
              placeholder="Explícame brevemente tu idea."
              rows={4}
            />
            <Form.Control.Feedback>Buena idea!</Form.Control.Feedback>
          </Form.Group>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}>
            <Row>
              <Col
                xs={{ span: 12, order: 2 }}
                sm={{ span: 8, order: 1 }}
                className="d-flex align-items-center">
                {state && state.succeeded && (
                  <p>
                    ¡Mensaje enviado! <Check />
                  </p>
                )}
                {state && state.errors && (
                  <p>
                    Error al enviar el mensaje. <ExclamationTriangle />
                  </p>
                )}
              </Col>
              <Col
                xs={{ span: 12, order: 1 }}
                sm={{ span: 4, order: 2 }}
                className="mb-3 d-flex align-items-center justify-content-sm-end">
                <Button variant="outline-primary" type="submit">
                  {state.submitting ? "Enviando... " : "Enviar "}
                  {state.submitting ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <ArrowRight />
                  )}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Section>
  );
};
