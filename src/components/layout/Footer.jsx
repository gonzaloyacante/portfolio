import { useState, useRef } from "react";
import { Overlay, Tooltip, Stack } from "react-bootstrap";

import { Linkedin, Github, Envelope } from "react-bootstrap-icons";

export const Footer = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("gyacante9@gmail.com");
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <footer id="Footer">
      <Stack
        className="d-flex justify-content-center mb-2"
        direction="horizontal"
        gap={3}>
        <a
          type="button"
          className="fs-1 m-0 p-0 link-secondary d-flex align-items-center
          justify-content-center btn"
          href="https://github.com/gonzaloyacante"
          target="_blank"
          rel="noopener noreferrer">
          <Linkedin className="text-primary-hover" />
        </a>
        <span
          style={{ cursor: "pointer" }}
          ref={target}
          onClick={handleEmailClick}>
          <Envelope className="fs-1 m-0 p-0 text-primary-hover" />
        </span>
        <Overlay target={target.current} show={show} placement="top">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              Copiaste el correo
              <br />
              <b>gyacante9@gmail.com</b>
            </Tooltip>
          )}
        </Overlay>
        <a
          type="button"
          className="fs-1 m-0 p-0 d-flex align-items-center
          justify-content-center btn"
          href="https://www.linkedin.com/in/gonzaloyacante/"
          target="_blank"
          rel="noopener noreferrer">
          <Github className="text-primary-hover" />
        </a>
      </Stack>
      <p className="text-center">Gonzalo Yacante &copy; 2024</p>
    </footer>
  );
};
