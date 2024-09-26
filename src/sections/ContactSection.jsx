import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import { Section } from "../components/layout/Section";

export const ContactSection = () => {
  const [validated, setValidated] = useState(false);

  const handleChange = () => {
    setValidated(true);
  };
  return (
    <Section title="Contáctame" id="Contact">
      <Form
        name="contact"
        method="post"
        onChange={handleChange}
        onSubmit="submit"
        className="w-100"
        noValidate
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
            className="mb-3 text-end"
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}>
            <Button type="submit">Enviar</Button>
          </Col>
        </Row>
      </Form>
    </Section>
  );
};
