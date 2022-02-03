import { NavBarHeader } from "../../Components/Containers";
import { SvgIcon, TestIcon } from "../../Utilities/Images/TestIcon";

function NavBar() {
  return (
    <NavBarHeader>
      <SvgIcon Icon={TestIcon} height={50} color={"red"} />
    </NavBarHeader>
  );
}

export default NavBar;
