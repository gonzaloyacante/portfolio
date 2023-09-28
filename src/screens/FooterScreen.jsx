import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";

import { useState, useRef } from "react";

import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Stack from "react-bootstrap/Stack";

export const FooterScreen = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("gyacante9@gmail.com");
    setShow(true);

    // Después de 5 segundos, oculta el mensaje de tooltip
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
          <FaGithub className="text-primary-hover" />
        </a>
        <span
          style={{ cursor: "pointer" }}
          ref={target}
          onClick={handleEmailClick}>
          <FaEnvelope className="fs-1 m-0 p-0 text-primary-hover" />
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
          <FaLinkedin />
        </a>
      </Stack>
      <p className="text-center">Gonzalo Yacante &copy; 2023</p>
    </footer>
  );
};
