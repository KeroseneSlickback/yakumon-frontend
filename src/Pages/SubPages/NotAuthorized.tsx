import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
  TopH1,
} from "../../Components/Page-accessories";

const NotAuthorized = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // setTimeout(() => {
    //   navigate("/");
    // }, 2000);
  }, [navigate]);
  return (
    <SinglePageContainer>
      <PageSectionCard title centered>
        <TopH1>Not Authorized</TopH1>
        <p>You will be redirected shortly</p>
      </PageSectionCard>
      <LoadingIconContainer>
        <LoadingIcon />
      </LoadingIconContainer>
    </SinglePageContainer>
  );
};

export default NotAuthorized;
