import { SmallButton } from "../Components/Buttons";
import {
  PageSection,
  SelectContainer,
  SinglePageContainer,
  ShowcaseGrid,
} from "../Components/Containers";
import { ShowcaseImg } from "../Components/Page-accessories";
import hairsalon from "../Utilities/Images/hairsalon.jpeg";

const Home = () => {
  return (
    <SinglePageContainer>
      <PageSection>
        <h1>Welcome to Yakumon</h1>
        <h3>Please select a store to start your reservation today</h3>
      </PageSection>
      <PageSection styled>
        <h2>Store Showcase</h2>
        <ShowcaseGrid>
          {/* map these from fetched, whole containers to be clickable */}
          <SelectContainer to={"/store/1"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h4>Store Name</h4>
            <SmallButton>Reserve</SmallButton>
          </SelectContainer>
          <SelectContainer to={"/store/2"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h4>Very Long Store Name</h4>
            <SmallButton>Reserve</SmallButton>
          </SelectContainer>
          <SelectContainer to={"/store/3"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h4>Shtn</h4>
            <SmallButton>Reserve</SmallButton>
          </SelectContainer>
          <SelectContainer to={"/store/4"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h4>Store Name</h4>
            <SmallButton>Reserve</SmallButton>
          </SelectContainer>
        </ShowcaseGrid>
        {/*  */}
      </PageSection>
    </SinglePageContainer>
  );
};

export default Home;
