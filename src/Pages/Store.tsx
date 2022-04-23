import {
  PageSectionCard,
  SinglePageContainer,
  StoreInfoContainer,
  SelectContainer,
  ShowcaseGrid,
  StoreDescContainer,
} from "../Components/Containers";
import {
  ErrorContainer,
  LoadingIcon,
  LoadingIconContainer,
  ShowcaseImg,
  StoreImg,
} from "../Components/Page-accessories";

import location from "../Utilities/Images/SVGs/location.svg";
import clock from "../Utilities/Images/SVGs/clock.svg";
import phone from "../Utilities/Images/SVGs/phone.svg";
import site from "../Utilities/Images/SVGs/site.svg";
import { useState, useEffect } from "react";
import { ReturnStoreType } from "../Utilities/types";
import axios from "axios";
import { useParams } from "react-router-dom";

const Store = () => {
  const { id } = useParams();
  const [store, setStore] = useState<ReturnStoreType | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [storeImg, setStoreImg] = useState<string>("");

  useEffect(() => {
    setLoad(true);
    const debounce = setTimeout(() => {
      const getData = async () => {
        await axios
          .get<ReturnStoreType>(`http://localhost:8888/store/${id}`)
          .then((response) => {
            setLoad(false);
            setError(false);
            setStore(response.data);
            if (response.data.picture) {
              setStoreImg(response.data.picture.toString("base64"));
            }
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
        <div>
          <PageSectionCard noPadding center>
            <h1>{store?.storeName}</h1>
            <StoreImg
              src={`data:image/png;base64,${storeImg}`}
              alt={store?.storeName}
            />
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
                  <table>
                    <tbody>
                      {/* {store?.hours.map((hour) => {
                        return (
                          <tr key={hour._id}>
                            <td>{hour.day}</td>
                            <td>
                              {hour.open} - {hour.close}
                            </td>
                          </tr>
                        );
                      })} */}
                    </tbody>
                  </table>
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
