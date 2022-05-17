import { Link } from "react-router-dom";
import { NavBarHeader } from "../../Components/Containers";
// import { SvgIcon, TestIcon } from "../../Utilities/Images/TestIcon";
import { YakumonLogoSvg } from "../../Utilities/Images/SVGComponents/YakumonLogoSvg";

function NavBar() {
  return (
    <NavBarHeader>
      <Link to="/">
        <YakumonLogoSvg />
        <h1>Yakumon</h1>
      </Link>
    </NavBarHeader>
  );
}

export default NavBar;
