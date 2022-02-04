import {
  MainPageContainer,
  OverallPageContainer,
} from "../../Components/Containers";
import Footer from "./Footer";
import NavBar from "./NavBar";

interface ThemeProps {
  children: JSX.Element;
  themeToggle: () => void;
}

function MainLayout({ children, themeToggle }: ThemeProps) {
  return (
    <OverallPageContainer>
      <NavBar />
      <MainPageContainer>{children}</MainPageContainer>
      <Footer themeToggle={themeToggle} />
    </OverallPageContainer>
  );
}

export default MainLayout;
