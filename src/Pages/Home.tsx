import {
  PageSection,
  SelectContainers,
  SinglePageContainer,
} from "../Components/Containers";
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
        <SelectContainers>
          <img src={hairsalon} alt="hairsalon" />
        </SelectContainers>
        {/*  */}
      </PageSection>
    </SinglePageContainer>
  );
};

export default Home;
