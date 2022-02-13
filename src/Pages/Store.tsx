import {
  PageSection,
  SinglePageContainer,
  StoreInfoContainer,
  StorePageSection,
  SelectContainer,
  ShowcaseGrid,
  StoreDescContainer,
} from "../Components/Containers";
import { SmallButton } from "../Components/Buttons";
import {
  ShowcaseImg,
  StoreHeader,
  StoreImg,
} from "../Components/Page-accessories";

import hairsalon from "../Utilities/Images/hairsalon.jpeg";

const Store = () => {
  return (
    <SinglePageContainer>
      <PageSection noPadding center>
        <StoreHeader>Store Name</StoreHeader>
        <StoreImg src={hairsalon} />
      </PageSection>
      <StorePageSection styled>
        <StoreInfoContainer>
          <span>
            <h4>Location:</h4>
            <a
              href="https://goo.gl/maps/VQGjtSMdKht3vARB7"
              target="_blank"
              rel="noreferrer"
            >
              7745 Allano Way, Las Vegas NV 89128
            </a>
            <a href="google.com">Website</a>
          </span>
          <span>
            <h4>Hours:</h4>
            <p>Sun: 9am - 7pm</p>
            <p>Mon: 9am - 7pm</p>
            <p>Tues: 9am - 7pm</p>
            <p>Wed: 9am - 7pm</p>
            <p>Thurs: 9am - 7pm</p>
            <p>Fri: 9am - 7pm</p>
            <p>Sat: 9am - 7pm</p>
          </span>
        </StoreInfoContainer>
      </StorePageSection>
      <PageSection>
        <StoreDescContainer>
          <h3>Store description:</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </StoreDescContainer>
      </PageSection>
      <PageSection styled>
        <h2>Stylists</h2>
        <ShowcaseGrid>
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
      </PageSection>
    </SinglePageContainer>
  );
};

export default Store;
