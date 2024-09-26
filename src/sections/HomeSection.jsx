import { Image } from "react-bootstrap";
import { Section } from "../components/layout/Section";

export const HomeSection = () => {
  return (
    <Section title="" className="m-0" id="Home">
      <p className="fs-5 m-1">Hola, yo soy</p>
      <h1 className="text-primary fs-1">
        <strong>Gonzalo Yacante</strong>
      </h1>
      <p className="fs-4">Desarrollador Frontend</p>

      {/* <Button variant="outline-primary">Descargar CV</Button> */}
      <Image
        className="img-astronaut"
        src="https://imgur.com/hJpXRh0.png"
        alt="Imagen de astronauta."
      />
    </Section>
  );
};
