import { NavBarHeader } from "../../Components/Containers";
// import { SvgIcon, TestIcon } from "../../Utilities/Images/TestIcon";
import { YakumonLogoSvg } from "../../Utilities/Images/SVGComponents/YakumonLogoSvg";

function NavBar() {
  return (
    <NavBarHeader>
      <YakumonLogoSvg />
      <h1>Yakumon</h1>
    </NavBarHeader>
  );
}

export default NavBar;
