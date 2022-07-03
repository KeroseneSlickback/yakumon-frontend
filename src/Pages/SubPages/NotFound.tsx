import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import { TopH1 } from "../../Components/Page-accessories";

const NotFound = () => {
  return (
    <SinglePageContainer>
      <PageSectionCard absolute>
        <TopH1>Page Not Found</TopH1>
      </PageSectionCard>
    </SinglePageContainer>
  );
};

export default NotFound;
