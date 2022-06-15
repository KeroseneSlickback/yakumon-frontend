import { Link } from "react-router-dom";
import { TinyButton } from "../../Components/Buttons";
import { FooterContainer } from "../../Components/Containers";

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Yakumon is a demonstration reservation app created by Mitchell William
        Spaur
      </p>
      <div>
        <Link to={"/portal"}>
          <TinyButton>Employee/Owner Area</TinyButton>
        </Link>
      </div>
    </FooterContainer>
  );
};

export default Footer;
