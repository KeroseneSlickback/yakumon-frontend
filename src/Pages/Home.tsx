import axios from "axios";
import { useEffect, useState } from "react";
import {
  PageSectionCard,
  SelectContainer,
  SinglePageContainer,
  ShowcaseGrid,
  SelectContainerDiv,
} from "../Components/Containers";
import {
  ErrorContainer,
  LoadingIcon,
  LoadingIconContainer,
  ShowcaseImg,
} from "../Components/Page-accessories";
import { FillerImgSvg } from "../Utilities/Images/SVGComponents/FillerImgSvg";
import { ErrorMessage, ReturnStoreType } from "../Utilities/types";

const Home = () => {
  const [fetchedStores, setFetchedStores] = useState<ReturnStoreType[] | null>(
    null
  );
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<ErrorMessage | null>(null);
  useEffect(() => {
    setLoad(true);
    const debounce = setTimeout(() => {
      const getData = async () => {
        await axios
          .get<ReturnStoreType[]>("http://localhost:8888/store")
          .then((response) => {
            response.data.forEach((store) => {
              if (store.picture) {
                store.picture = store.picture.toString("base64");
              }
            });
            setFetchedStores(response.data);
            setLoad(false);
            setError(null);
          })
          .catch((e) => {
            console.log(e);
            setError((prev) => ({
              ...prev,
              message: "Cannot find stores.",
              warning: true,
            }));
          });
      };
      getData();
    }, 500);
    return () => clearTimeout(debounce);
  }, []);
  return (
    <SinglePageContainer>
      <PageSectionCard topCard homeH1>
        <h1>Welcome to Yakumon</h1>
      </PageSectionCard>
      <PageSectionCard styled>
        <h2>Select a Store to Start a Reservation</h2>
        <ShowcaseGrid>
          {error ? (
            <ErrorContainer>
              <h3>There was an error.</h3>
            </ErrorContainer>
          ) : load ? (
            <LoadingIconContainer>
              <LoadingIcon />
            </LoadingIconContainer>
          ) : (
            fetchedStores?.map((store) => {
              return (
                <SelectContainer to={`store/${store._id}`} key={store._id}>
                  {store.picture ? (
                    <ShowcaseImg
                      src={`data:image/png;base64,${store.picture}`}
                    />
                  ) : (
                    <FillerImgSvg />
                  )}
                  <SelectContainerDiv>
                    <h3>{store.storeName}</h3>
                  </SelectContainerDiv>
                </SelectContainer>
              );
            })
          )}
        </ShowcaseGrid>
        {/*  */}
      </PageSectionCard>
    </SinglePageContainer>
  );
};

export default Home;
