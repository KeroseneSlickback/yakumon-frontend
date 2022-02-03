import { NavBarHeader } from "../../Components/Containers";
import { SvgIcon } from "../../Utilities/Images/SVGComponents/SvgContainer";
import LogoSVG from "../../Utilities/Images/SVGs/LogoSVG";

function NavBar() {
  return (
    <NavBarHeader>
      <SvgIcon Icon={LogoSVG} />
    </NavBarHeader>
  );
}

export default NavBar;
