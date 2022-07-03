import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BackDrop } from "../../Components/Backdrop";
import { SmallButton } from "../../Components/Buttons";
import { NavBarHeader } from "../../Components/Containers";
import { NavLogButtonBox } from "../../Components/ModalComponents";
import AuthContext from "../../Utilities/AuthContext";
import { YakumonLogoSvg } from "../../Utilities/Images/SVGComponents/YakumonLogoSvg";
import LoginModal from "../Modals/LoginModal";
import LogoutModal from "../Modals/LogoutModal";
import RegisterModal from "../Modals/RegisterModal";

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const [viewLogin, setViewLogin] = useState<boolean>(false);
  const [viewRegister, setViewRegister] = useState<boolean>(false);
  const [viewLogout, setViewLogout] = useState<boolean>(false);

  const closeModal = () => {
    setViewLogin(false);
    setViewLogout(false);
    setViewRegister(false);
  };

  const showLogin = () => {
    setViewLogin(true);
  };

  const showRegister = () => {
    setViewRegister(true);
  };

  const showLogout = () => {
    setViewLogout(true);
  };

  return (
    <NavBarHeader>
      <Link to="/">
        <YakumonLogoSvg height={30} width={30} />
        <h1>Yakumon</h1>
      </Link>
      <NavLogButtonBox>
        {authContext.loggedIn ? (
          <SmallButton onClick={showLogout}>Logout</SmallButton>
        ) : (
          <>
            <SmallButton register onClick={showRegister}>
              Register
            </SmallButton>
            <SmallButton onClick={showLogin}>Login</SmallButton>
          </>
        )}
      </NavLogButtonBox>
      {viewLogin || viewRegister || viewLogout ? (
        <BackDrop onClick={closeModal} />
      ) : null}
      {viewLogin ? <LoginModal closeModal={closeModal} /> : null}
      {viewRegister ? <RegisterModal closeModal={closeModal} /> : null}
      {viewLogout ? <LogoutModal closeModal={closeModal} /> : null}
    </NavBarHeader>
  );
};

export default NavBar;
