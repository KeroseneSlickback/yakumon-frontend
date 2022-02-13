import {
  MainPageContainer,
  OverallPageContainer,
} from "../../Components/Containers";
import Footer from "./Footer";
import NavBar from "./NavBar";

interface ThemeProps {
  children: JSX.Element;
}

function MainLayout({ children }: ThemeProps) {
  return (
    <OverallPageContainer>
      <NavBar />
      <MainPageContainer>{children}</MainPageContainer>
      <Footer />
    </OverallPageContainer>
  );
}

export default MainLayout;
