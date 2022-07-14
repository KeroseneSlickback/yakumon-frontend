import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BackDrop } from "../../Components/Backdrop";
import { MediumButton } from "../../Components/Buttons";
import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import { RegisterLoginDiv, TopH1 } from "../../Components/Page-accessories";
import LoginModal from "../../Modules/Modals/LoginModal";
import RegisterModal from "../../Modules/Modals/RegisterModal";
import AuthContext from "../../Utilities/AuthContext";

const OwnerEmployeeLogin = () => {
  const authContext = useContext(AuthContext);
  const [viewRegister, setViewRegister] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);

  const closeModal = () => {
    setViewRegister(false);
    setViewLogin(false);
  };

  const toggleRegisterModal = () => {
    setViewRegister(true);
  };

  const toggleLoginModal = () => {
    setViewLogin(true);
  };

  if (authContext.loggedIn) {
    if (authContext.owner && authContext.employee) {
      return (
        <SinglePageContainer>
          <PageSectionCard head>
            <TopH1>Please choose an Entrance</TopH1>
            <RegisterLoginDiv>
              <div>
                <Link to={"/portal/owner"}>
                  <MediumButton portal>Owner Portal</MediumButton>
                </Link>
                <Link to={"/portal/employee"}>
                  <MediumButton portal>Employee Portal</MediumButton>
                </Link>
              </div>
            </RegisterLoginDiv>
          </PageSectionCard>
        </SinglePageContainer>
      );
    } else if (authContext.owner) {
      return (
        <SinglePageContainer>
          <PageSectionCard head>
            <TopH1>Welcome Store Owner</TopH1>
            <div>
              <Link to={"/portal/owner"}>
                <MediumButton portal>Owner Portal</MediumButton>
              </Link>
            </div>
          </PageSectionCard>
        </SinglePageContainer>
      );
    } else if (authContext.employee) {
      return (
        <SinglePageContainer>
          <PageSectionCard head>
            <TopH1>Welcome Store Employee</TopH1>
            <div>
              <Link to={"/portal/employee"}>
                <MediumButton portal>Employee Portal</MediumButton>
              </Link>
              <p>
                If you wish to become a store owner, please email the admin at
                admin@yakumon.com and await to be whitelisted by Yakumon's team.
              </p>
            </div>
          </PageSectionCard>
        </SinglePageContainer>
      );
    } else {
      return (
        <SinglePageContainer>
          <PageSectionCard head>
            <TopH1>Not Yet an Owner or Employee?</TopH1>
            <div>
              <p>
                If you wish to be listed as an employee on Yakumon, please make
                a request to your store's owner.
              </p>
              <p>
                If you wish to become a store owner, please email the admin at
                admin@yakumon.com and await to be whitelisted by Yakumon's team.
              </p>
            </div>
          </PageSectionCard>
        </SinglePageContainer>
      );
    }
  } else {
    return (
      <SinglePageContainer>
        <PageSectionCard head>
          <TopH1>Welcome Owner or Employee</TopH1>
          <h2>Please Login or Register</h2>
          <RegisterLoginDiv>
            <div>
              <MediumButton onClick={toggleRegisterModal} register>
                Register
              </MediumButton>
              <MediumButton onClick={toggleLoginModal} log>
                Login
              </MediumButton>
            </div>
          </RegisterLoginDiv>
        </PageSectionCard>
        {viewRegister || viewLogin ? <BackDrop onClick={closeModal} /> : null}
        {viewRegister ? <RegisterModal closeModal={closeModal} /> : null}
        {viewLogin ? <LoginModal closeModal={closeModal} /> : null}
      </SinglePageContainer>
    );
  }
};

export default OwnerEmployeeLogin;
