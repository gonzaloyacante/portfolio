import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";

import Stack from "react-bootstrap/Col";

export const FooterScreen = () => {
  return (
    <footer id="Footer" className="w-100 text-center">
      <Stack direction="horizontal" gap={3}>
        <FaLinkedin />
        <FaGithub />
        <FaEnvelope />
      </Stack>
      <p>Gonzalo Yacante &copy; 2023 | Todos los derechos reservados</p>
    </footer>
  );
};
