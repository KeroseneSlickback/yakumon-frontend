import {
  PageSection,
  SinglePageContainer,
  StoreInfoContainer,
  StorePageSection,
  SelectContainer,
  ShowcaseGrid,
  StoreDescContainer,
} from "../Components/Containers";
import { ShowcaseImg, StoreImg } from "../Components/Page-accessories";

import hairsalon from "../Utilities/Images/hairsalon.jpeg";
import location from "../Utilities/Images/SVGs/location.svg";
import clock from "../Utilities/Images/SVGs/clock.svg";
import phone from "../Utilities/Images/SVGs/phone.svg";
import site from "../Utilities/Images/SVGs/site.svg";

const Store = () => {
  return (
    <SinglePageContainer>
      <PageSection noPadding center>
        <h1>Store Name</h1>
        <StoreImg src={hairsalon} />
      </PageSection>
      <StorePageSection styled overlap>
        <StoreInfoContainer>
          <span>
            <img src={location} alt="location" />
            {/* <h4>Location:</h4> */}
            <a
              href="https://goo.gl/maps/VQGjtSMdKht3vARB7"
              target="_blank"
              rel="noreferrer"
            >
              7745 Allano Way, Las Vegas NV 89128
            </a>
          </span>
          <span>
            <img src={site} alt="site" />
            {/* <h4>Website:</h4> */}
            <a href="https://verylongstorename.com">verylongstorename.com</a>
          </span>
          <span>
            <img src={phone} alt="phone" />
            {/* <h4>Phone:</h4> */}
            <p>1 (702) 979-8978</p>
          </span>
          <span>
            <img src={clock} alt="clock" />
            {/* <h4>Hours:</h4> */}
            <span>
              <p>Sun: 9am - 7pm</p>
              <p>Mon: 9am - 7pm</p>
              <p>Tues: 9am - 7pm</p>
              <p>Wed: 9am - 7pm</p>
              <p>Thurs: 9am - 7pm</p>
              <p>Fri: 9am - 7pm</p>
              <p>Sat: 9am - 7pm</p>
            </span>
          </span>
        </StoreInfoContainer>
      </StorePageSection>
      <PageSection>
        {/* Why is it going under?? */}
        <StoreDescContainer>
          <h3>Description:</h3>
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
        <h2>Select a Stylist</h2>
        <ShowcaseGrid>
          <SelectContainer to={"/store/1"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Stylist's Name</h3>
          </SelectContainer>
          <SelectContainer to={"/store/2"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Very Long Stylist's Name</h3>
          </SelectContainer>
          <SelectContainer to={"/store/3"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Styn</h3>
          </SelectContainer>
          <SelectContainer to={"/store/4"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Stylist's Name</h3>
          </SelectContainer>
        </ShowcaseGrid>
      </PageSection>
    </SinglePageContainer>
  );
};

export default Store;
