import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BackDrop } from "../../Components/Backdrop";
import {
  CenterButtonDiv,
  LargeButton,
  MediumButton,
} from "../../Components/Buttons";
import {
  FullWidthContainer,
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import { StyledForm } from "../../Components/FormComponents";
import {
  ErrorContainer,
  LoadingIcon,
  LoadingIconContainer,
} from "../../Components/Page-accessories";
import NewStoreModal from "../../Modules/Modals/NewStoreModal";
import AuthContext from "../../Utilities/AuthContext";
import { ReturnStoreType, ReturnUserType } from "../../Utilities/types";

const OwnerSection = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<ReturnUserType | null>(null);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [viewCreateStore, setViewCreateStore] = useState<boolean>(false);

  const toggleCreateStoreModal = () => {
    setViewCreateStore(true);
  };

  const closeModal = () => {
    setViewCreateStore(false);
  };

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
            : user.ownedStores.map((store) => {
                return (
                  <PageSectionCard>
                    <h1>{store.storeName}</h1>
                  </PageSectionCard>
                );
              })}
          <PageSectionCard>
            <CenterButtonDiv>
              <LargeButton faintHighlight onClick={toggleCreateStoreModal}>
                Create a Store
              </LargeButton>
            </CenterButtonDiv>
          </PageSectionCard>
        </>
      )}
      {viewCreateStore ? <NewStoreModal closeModal={closeModal} /> : null}
      {viewCreateStore ? <BackDrop onClick={closeModal} /> : null}
    </SinglePageContainer>
  );
};

export default OwnerSection;
