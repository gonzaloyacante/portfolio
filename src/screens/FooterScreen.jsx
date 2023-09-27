import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";

import Stack from "react-bootstrap/Stack";

export const FooterScreen = () => {
  return (
    <footer id="Footer">
      <Stack
        className="d-flex justify-content-center"
        direction="horizontal"
        gap={3}>
        <span
          onClick={() => navigator.clipboard.writeText("gyacante9@gmail.com")}
          className="fs-2 m-0 p-0 text-white">
          <FaEnvelope />
        </span>
        <a
          className="rounded d-flex align-items-center justify-content-center"
          href="https://github.com/gonzaloyacante"
          target="_blank"
          rel="noopener noreferrer">
          <span className="fs-2 m-0 p-0 text-white">
            <FaGithub />
          </span>
        </a>
        <a
          className="rounded d-flex align-items-center justify-content-center"
          href="https://www.linkedin.com/in/gonzaloyacante/"
          target="_blank"
          rel="noopener noreferrer">
          <span className="fs-2 m-0 p-0 text-white">
            <FaLinkedin />
          </span>
        </a>
      </Stack>
      <p className="text-center">Gonzalo Yacante &copy; 2023</p>
    </footer>
  );
};
