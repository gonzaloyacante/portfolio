import Container from "react-bootstrap/Container";

import { Header } from "./components/layout/Header";
import { ScrollToTop } from "./components/ui/ScrollToTop";

import { HomeSection } from "./sections/HomeSection";
import { AboutMeSection } from "./sections/AboutMeSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./components/layout/Footer";

function App() {
  return (
    <Container className="pt-5 mx-auto">
      <Header />
      <ScrollToTop />
      <HomeSection />
      <AboutMeSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </Container>
  );
}

export default App;
