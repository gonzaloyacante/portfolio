import { Header } from "./components/Header";
import { ScrollToTop } from "./components/ScrollToTop";

import { HomeScreen } from "./screens/HomeScreen";
import { AboutMeScreen } from "./screens/AboutMeScreen";
import { SkillsScreen } from './screens/SkillsScreen'
// import { PortfolioScreen } from './screens/PortfolioScreen'
// import { ContactScreen } from './screens/ContactScreen'
import { FooterScreen } from './screens/FooterScreen'

function App() {
  return (
    <div className="container pt-5 mx-auto">
      <Header />
      <ScrollToTop />
      <HomeScreen />
      <AboutMeScreen />
      <SkillsScreen />
      {/* <PortfolioScreen />
      <ContactScreen /> */}
      <FooterScreen />
    </div>
  );
}

export default App;
