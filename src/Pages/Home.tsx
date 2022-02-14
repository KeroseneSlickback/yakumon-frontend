import { SmallButton } from "../Components/Buttons";
import {
  PageSectionCard,
  SelectContainer,
  SinglePageContainer,
  ShowcaseGrid,
} from "../Components/Containers";
import { ShowcaseImg } from "../Components/Page-accessories";
import hairsalon from "../Utilities/Images/hairsalon.jpeg";

const Home = () => {
  return (
    <SinglePageContainer>
      <PageSectionCard noPadding homeH1>
        <h1>Welcome to Yakumon</h1>
      </PageSectionCard>
      <PageSectionCard styled>
        <h2>Select a Store to Start a Reservation</h2>
        <ShowcaseGrid>
          {/* map these from fetched, whole containers to be clickable */}
          <SelectContainer to={"/store/1"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Store Name</h3>
          </SelectContainer>
          <SelectContainer to={"/store/2"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Very Long Store Name</h3>
          </SelectContainer>
          <SelectContainer to={"/store/3"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Shtn</h3>
          </SelectContainer>
          <SelectContainer to={"/store/4"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Store Name</h3>
          </SelectContainer>
        </ShowcaseGrid>
        {/*  */}
      </PageSectionCard>
    </SinglePageContainer>
  );
};

export default Home;
