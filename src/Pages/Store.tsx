import {
  PageSectionCard,
  SinglePageContainer,
  StoreInfoContainer,
  SelectContainer,
  ShowcaseGrid,
  StoreDescContainer,
  StoreImgDiv,
} from "../Components/Containers";
import {
  ErrorContainer,
  LoadingIcon,
  LoadingIconContainer,
  ShowcaseImg,
  StoreHourTable,
  StoreImg,
  TopH1,
} from "../Components/Page-accessories";

import location from "../Utilities/Images/SVGs/location.svg";
import clock from "../Utilities/Images/SVGs/clock.svg";
import phone from "../Utilities/Images/SVGs/phone.svg";
import site from "../Utilities/Images/SVGs/site.svg";
import { useState, useEffect } from "react";
import { MessageType, ReturnStoreType } from "../Utilities/types";
import axios from "axios";
import { useParams } from "react-router-dom";
import StoreHour from "../Components/StoreHour";
import { FillerImgSvg } from "../Utilities/Images/SVGComponents/FillerImgSvg";
import RegularMessage, { MessageBox } from "../Modules/Messages/RegularMessage";

const weekdaysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const Store = () => {
  const { id } = useParams();
  const [store, setStore] = useState<ReturnStoreType | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<MessageType | null>(null);
  const [storeImg, setStoreImg] = useState<string>("");
  // const [storeDays, setStoreDays] = useState<string[]>([]);

  // const processDays = ()

  useEffect(() => {
    setLoad(true);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<ReturnStoreType>(`http://localhost:8888/store/${id}`)
          .then((response) => {
            setLoad(false);
            setStore(response.data);
            if (response.data.picture) {
              setStoreImg(response.data.picture.toString("base64"));
            }
          })
          .catch((e) => {
            console.log(e);
            setError({
              message: "Error: Cannot find store.",
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
        <div>
          <PageSectionCard topCard center>
            <TopH1 storePage>{store?.storeName}</TopH1>
            <StoreImgDiv>
              <div>
                {storeImg ? (
                  <StoreImg
                    src={`data:image/png;base64,${storeImg}`}
                    alt={store?.storeName}
                  />
                ) : (
                  <FillerImgSvg storeImg />
                )}
              </div>
            </StoreImgDiv>
          </PageSectionCard>
          <PageSectionCard styled>
            <StoreInfoContainer>
              <span>
                <img src={location} alt="location" />
                <a href={store?.locationLink} target="_blank" rel="noreferrer">
                  {store?.location}
                </a>
              </span>
              {store?.storeWebsite ? (
                <span>
                  <img src={site} alt="site" />
                  <a href={store.storeWebsite} target="_blank" rel="noreferrer">
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
          <PageSectionCard secondary>
            <StoreDescContainer>
              <h2>Description:</h2>
              <p>{store?.storeDescription}</p>
            </StoreDescContainer>
          </PageSectionCard>
          <PageSectionCard styled>
            <h2>Select a Stylist</h2>
            <ShowcaseGrid>
              {store?.employees.map((employee) => {
                return (
                  <SelectContainer
                    to={`/reservation/${employee._id}`}
                    key={employee._id}
                  >
                    <ShowcaseImg
                      src={`data:image/png;base64,${employee?.picture}`}
                      alt="hairsalon"
                    />
                    <h3>
                      {employee.firstName} {employee.lastName}
                    </h3>
                  </SelectContainer>
                );
              })}
            </ShowcaseGrid>
          </PageSectionCard>
        </div>
      )}
    </SinglePageContainer>
  );
};

export default Store;
