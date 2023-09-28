import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const ContactScreen = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      form.setAttribute("onSubmit", "submit"); // Agregar el atributo onSubmit
    }

    setValidated(true);
  };
  return (
    <section className="my-5" id="Skills">
      <h2>Contáctame</h2>
      <Form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="my-4 px-2"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}>
        <Row className="flex-column">
          <input type="hidden" name="form-name" value="contact" />
          <Form.Group
            className="mb-3"
            as={Col}
            md={{ span: 6, offset: 3 }}
            controlId="validationCustom01">
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
            md={{ span: 6, offset: 3 }}
            controlId="validationCustom02">
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
            md={{ span: 6, offset: 3 }}
            controlId="validationCustom03">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              name="Message"
              required
              as="textarea"
              placeholder="Explícame brevemente tu idea."
              rows={4}
            />
            <Form.Control.Feedback>Buena idea!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" as={Col} md={{ span: 6, offset: 3 }}>
            <Button type="submit">Enviar</Button>
          </Form.Group>
        </Row>
      </Form>
    </section>
  );
};
