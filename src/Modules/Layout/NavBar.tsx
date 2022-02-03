import { NavBarHeader } from "../../Components/Containers";
import {
  SvgIcon,
  TestIcon,
} from "../../Utilities/Images/SVGComponents/SvgContainer";
// import LogoSVG from "../../Utilities/Images/SVGs/LogoSVG";

function NavBar() {
  return (
    <NavBarHeader>
      <SvgIcon Icon={TestIcon} />
    </NavBarHeader>
  );
}

export default NavBar;
