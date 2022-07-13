import {
  PageSectionCard,
  SinglePageContainer,
  StoreInfoContainer,
  SelectContainer,
  ShowcaseGrid,
  StoreDescContainer,
  StoreImgDiv,
  PageDivider,
  PageSplitContainer,
} from "../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
  ShowcaseImg,
  StoreHourTable,
  StoreImg,
  TopH1,
  TopH2,
} from "../Components/Page-accessories";

import location from "../Utilities/Images/SVGs/location.svg";
import clock from "../Utilities/Images/SVGs/clock.svg";
import phone from "../Utilities/Images/SVGs/phone.svg";
import site from "../Utilities/Images/SVGs/site.svg";
import { useState, useEffect } from "react";
import { MessageType, StoreType } from "../Utilities/types";
import axios from "axios";
import { useParams } from "react-router-dom";
import StoreHour from "../Components/StoreHour";
import { FillerImgSvg } from "../Utilities/Images/SVGComponents/FillerImgSvg";
import RegularMessage, { MessageBox } from "../Modules/Messages/RegularMessage";

const weekdaysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const Store = () => {
  const { id } = useParams();
  const [store, setStore] = useState<StoreType | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<MessageType | null>(null);
  const [storeImg, setStoreImg] = useState<string>("");

  useEffect(() => {
    setLoad(true);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<StoreType>(`http://localhost:8888/store/${id}`)
          .then((response) => {
            setLoad(false);
            setStore(response.data);
            if (response.data.picture) {
              setStoreImg(response.data.picture.toString("base64"));
            }
          })
          .catch((e) => {
            setError({
              message: `${e.response.data.error}`,
              warning: true,
            });
          });
      };
      getData();
    }, 500);
    return () => clearTimeout(debounce);
  }, [id]);

  return (
    <SinglePageContainer>
      {error ? (
        <MessageBox absolute>
          <RegularMessage message={error.message} warning={error.warning} />
        </MessageBox>
      ) : load ? (
        <LoadingIconContainer absolute>
          <LoadingIcon />
        </LoadingIconContainer>
      ) : (
        <>
          <PageSectionCard title aboveHead>
            <TopH1 extraPadding>{store?.storeName}</TopH1>
          </PageSectionCard>
          <PageSplitContainer>
            <PageDivider left>
              <PageSectionCard noPadding>
                <StoreImgDiv>
                  {storeImg ? (
                    <StoreImg
                      src={`data:image/png;base64,${storeImg}`}
                      alt={store?.storeName}
                    />
                  ) : (
                    <FillerImgSvg storeImg />
                  )}
                </StoreImgDiv>
              </PageSectionCard>
              <PageSectionCard styled>
                <StoreInfoContainer>
                  <div>
                    <span>
                      <img src={location} alt="location" />
                      <a
                        href={store?.locationLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {store?.location}
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
                      <p>{store?.phoneNumber}</p>
                    </span>
                    <span>
                      <img src={clock} alt="clock" />
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
                    </span>
                  </div>
                </StoreInfoContainer>
              </PageSectionCard>
              <PageSectionCard secondary mobileOverlap>
                <StoreDescContainer>
                  <TopH2>Description:</TopH2>
                  {store?.storeDescription.split("\n").map((str, i) => {
                    return <p key={i}>{str}</p>;
                  })}
                </StoreDescContainer>
              </PageSectionCard>
            </PageDivider>
            <PageDivider right>
              <PageSectionCard styled>
                <TopH2>Select a Stylist</TopH2>
                <ShowcaseGrid employee>
                  {store?.employees.map((employee) => {
                    return (
                      <SelectContainer
                        to={`/reservation/${employee._id}`}
                        key={employee._id}
                      >
                        {employee.picture ? (
                          <ShowcaseImg
                            src={`data:image/png;base64,${employee.picture}`}
                            alt="hairsalon"
                          />
                        ) : (
                          <FillerImgSvg storeImg />
                        )}
                        <h3>
                          {employee.firstName} {employee.lastName}
                        </h3>
                      </SelectContainer>
                    );
                  })}
                </ShowcaseGrid>
              </PageSectionCard>
            </PageDivider>
          </PageSplitContainer>
        </>
      )}
    </SinglePageContainer>
  );
};

export default Store;
