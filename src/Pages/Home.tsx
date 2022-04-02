import axios from "axios";
import { useEffect, useState } from "react";
import {
  PageSectionCard,
  SelectContainer,
  SinglePageContainer,
  ShowcaseGrid,
} from "../Components/Containers";
import { ShowcaseImg } from "../Components/Page-accessories";
import hairsalon from "../Utilities/Images/hairsalon.jpeg";
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
            console.log(response.data);
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
    }, 300);
    return () => clearTimeout(debounce);
  }, []);
  return (
    <SinglePageContainer>
      <PageSectionCard noPadding homeH1>
        <h1>Welcome to Yakumon</h1>
      </PageSectionCard>
      <PageSectionCard styled>
        <h2>Select a Store to Start a Reservation</h2>
        <ShowcaseGrid>
          {/* map these from fetched, whole containers to be clickable */}
          <SelectContainer to={"/store/1"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Store Name</h3>
          </SelectContainer>
          <SelectContainer to={"/store/2"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Very Long Store Name</h3>
          </SelectContainer>
          <SelectContainer to={"/store/3"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Shtn</h3>
          </SelectContainer>
          <SelectContainer to={"/store/4"}>
            <ShowcaseImg src={hairsalon} alt="hairsalon" />
            <h3>Store Name</h3>
          </SelectContainer>
        </ShowcaseGrid>
        {/*  */}
      </PageSectionCard>
    </SinglePageContainer>
  );
};

export default Home;
