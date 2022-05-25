import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  CenterButtonDiv,
  MediumButton,
  SmallButton,
  StyledLinkButton,
} from "../../Components/Buttons";
import {
  PageSectionCard,
  SinglePageContainer,
  StoreImgDiv,
  StoreInfoContainer,
} from "../../Components/Containers";
import {
  ErrorContainer,
  LoadingIcon,
  LoadingIconContainer,
  StoreHourTable,
  StoreImg,
} from "../../Components/Page-accessories";
import AuthContext from "../../Utilities/AuthContext";
import { ReturnUserType } from "../../Utilities/types";
import { FillerImgSvg } from "../../Utilities/Images/SVGComponents/FillerImgSvg";
import location from "../../Utilities/Images/SVGs/location.svg";
import clock from "../../Utilities/Images/SVGs/clock.svg";
import phone from "../../Utilities/Images/SVGs/phone.svg";
import site from "../../Utilities/Images/SVGs/site.svg";
import StoreHour from "../../Components/StoreHour";

const weekdaysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const OwnerSection = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<ReturnUserType | null>(null);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoad(true);
    const debounce = setTimeout(() => {
      const getData = async () => {
        await axios
          .get<ReturnUserType>(
            `http://localhost:8888/user/${authContext.user?._id}`
          )
          .then((response) => {
            setLoad(false);
            setError(false);
            response.data.ownedStores?.forEach((store) => {
              if (store.picture) {
                store.picture.toString("base64");
              }
            });
            setUser(response.data);
          })
          .catch((e) => {
            console.log(e);
            setError(true);
          });
      };
      getData();
    }, 500);
    return () => clearTimeout(debounce);
  }, []);

  console.log(user?.ownedStores);

  return (
    <SinglePageContainer>
      {error ? (
        <ErrorContainer absolute>
          <h3>There was an error.</h3>
        </ErrorContainer>
      ) : load ? (
        <LoadingIconContainer absolute>
          <LoadingIcon />
        </LoadingIconContainer>
      ) : (
        <>
          <PageSectionCard topCard center bottomPadding>
            <h1>Welcome, {authContext.user?.firstName}</h1>
          </PageSectionCard>
          {!user
            ? null
            : !user.ownedStores
            ? null
            : user.ownedStores.map((store, storeIndex) => {
                return (
                  <PageSectionCard styled ownerSection key={storeIndex}>
                    <h1>{store.storeName}</h1>
                    <StoreImgDiv ownerSection>
                      {store.picture ? (
                        <StoreImg
                          ownerSection
                          src={`data:image/png;base64,${store.picture}`}
                          alt={store.storeName}
                        />
                      ) : (
                        <FillerImgSvg ownerSection />
                      )}
                      <div>
                        <MediumButton nonConstraint>Edit</MediumButton>
                        <SmallButton warning nonConstraint>
                          Delete
                        </SmallButton>
                      </div>
                    </StoreImgDiv>
                    <StoreInfoContainer ownerSection>
                      <span>
                        <img src={location} alt="location" />
                        <a
                          href={store.locationLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {store.location}
                        </a>
                      </span>
                      {store?.storeWebsite ? (
                        <span>
                          <img src={site} alt="site" />
                          <a
                            href={store.storeWebsite}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Visit Website
                          </a>
                        </span>
                      ) : null}
                      <span>
                        <img src={phone} alt="phone" />
                        <p>{store.phoneNumber}</p>
                      </span>
                      <span>
                        <img src={clock} alt="clock" />
                        <div>
                          <StoreHourTable>
                            <tbody>
                              {store?.hours.map((day, dayIndex) => {
                                return (
                                  <StoreHour
                                    key={day._id}
                                    day={day}
                                    weekday={weekdaysArray[dayIndex]}
                                  />
                                );
                              })}
                            </tbody>
                          </StoreHourTable>
                        </div>
                      </span>
                    </StoreInfoContainer>
                  </PageSectionCard>
                );
              })}
          <PageSectionCard secondary>
            <CenterButtonDiv>
              <StyledLinkButton to="/portal/newstore">
                New Store
              </StyledLinkButton>
            </CenterButtonDiv>
          </PageSectionCard>
        </>
      )}
    </SinglePageContainer>
  );
};

export default OwnerSection;
