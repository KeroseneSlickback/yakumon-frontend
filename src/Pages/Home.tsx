import {
  PageSection,
  SelectContainers,
  SinglePageContainer,
  ShowcaseGrid,
} from "../Components/Containers";
import { ShowcaseImg } from "../Components/Page-accessories";
import hairsalon from "../Utilities/Images/hairsalon.jpeg";

const Home = () => {
  return (
    <SinglePageContainer>
      <PageSection>
        <h2>Welcome to Yakumon</h2>
        <h3>Please select a store to start your reservation today</h3>
      </PageSection>
      <PageSection styled>
        <h3>Store Showcase</h3>
        <ShowcaseGrid>
          {/* map these from fetched */}
          <SelectContainers>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h4>Store Name</h4>
          </SelectContainers>
          <SelectContainers>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h4>Very Long Store Name</h4>
          </SelectContainers>
          <SelectContainers>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h4>Shtn</h4>
          </SelectContainers>
          <SelectContainers>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h4>Store Name</h4>
          </SelectContainers>
        </ShowcaseGrid>
        {/*  */}
      </PageSection>
    </SinglePageContainer>
  );
};

export default Home;
