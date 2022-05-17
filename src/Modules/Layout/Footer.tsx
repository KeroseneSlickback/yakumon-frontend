import { Link } from "react-router-dom";
import { TinyButton } from "../../Components/Buttons";
import { FooterContainer } from "../../Components/Containers";

function Footer() {
  return (
    <FooterContainer>
      <p>
        Yakumon is a demonstration reservation app created by Mitchell William
        Spaur
      </p>
      <Link to={"/portal"}>
        <TinyButton>Employee Entrance</TinyButton>
      </Link>
    </FooterContainer>
  );
}

export default Footer;
