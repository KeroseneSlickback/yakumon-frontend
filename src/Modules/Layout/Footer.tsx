import { SmallButton } from "../../Components/Buttons";
import { FooterContainer } from "../../Components/Containers";

interface ThemeProps {
  themeToggle: () => void;
}

function Footer({ themeToggle }: ThemeProps) {
  return (
    <FooterContainer>
      <SmallButton onClick={themeToggle}>Theme</SmallButton>
      <p>
        Yakumon is a demonstration reservation app created by Mitchell William
        Spaur
      </p>
    </FooterContainer>
  );
}

export default Footer;
