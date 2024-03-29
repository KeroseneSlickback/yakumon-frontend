import axios from "axios";
import { useEffect, useState } from "react";
import {
  PageSectionCard,
  SelectContainer,
  SinglePageContainer,
  ShowCaseContainer,
  SelectContainerDiv,
} from "../Components/Containers";
import {
  TopH1,
  LoadingIcon,
  LoadingIconContainer,
  ShowcaseImg,
  TopH2,
} from "../Components/Page-accessories";
import DelayMessageModule from "../Modules/Messages/DelayMessageModule";
import RegularMessage, { MessageBox } from "../Modules/Messages/RegularMessage";
import { FillerImgSvg } from "../Utilities/Images/SVGComponents/FillerImgSvg";
import { MessageType, StoreType } from "../Utilities/types";

const Home = () => {
  const [fetchedStores, setFetchedStores] = useState<StoreType[] | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<MessageType | null>(null);
  useEffect(() => {
    setLoad(true);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<StoreType[]>("https://yakumon-backend.onrender.com/store")
          .then((response) => {
            response.data.forEach((store) => {
              if (store.picture) {
                store.picture = store.picture.toString("base64");
              }
            });
            setFetchedStores(response.data);
            setLoad(false);
          })
          .catch((e) => {
            console.log(e.response.data);
            setError({
              message: `${e.response.data.message}`,
              warning: true,
            });
          });
      };
      getData();
    }, 500);
    return () => clearTimeout(debounce);
  }, []);

  return (
    <SinglePageContainer>
      <PageSectionCard head>
        <TopH1>Welcome to Yakumon</TopH1>
      </PageSectionCard>
      <PageSectionCard styled largeLimit>
        <TopH2>Select a Store to Start a Reservation</TopH2>
        <ShowCaseContainer>
          {error ? (
            <MessageBox>
              <RegularMessage message={error.message} warning={error.warning} />
            </MessageBox>
          ) : load ? (
            <LoadingIconContainer>
              <LoadingIcon />
              <DelayMessageModule load={load} />
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
        </ShowCaseContainer>
      </PageSectionCard>
    </SinglePageContainer>
  );
};

export default Home;
