import {
  MainPageContainer,
  OverallPageContainer,
} from "../../Components/Containers";
import Footer from "./Footer";
import NavBar from "./NavBar";

interface ThemeProps {
  children: JSX.Element;
  themeToggle: () => void;
  theme: string;
}

function MainLayout({ children, themeToggle, theme }: ThemeProps) {
  return (
    <OverallPageContainer>
      <NavBar />
      <MainPageContainer>{children}</MainPageContainer>
      <Footer themeToggle={themeToggle} theme={theme} />
    </OverallPageContainer>
    // Page Container
    // Navbar
    // Content Container
    // Footer
  );
}

export default MainLayout;
