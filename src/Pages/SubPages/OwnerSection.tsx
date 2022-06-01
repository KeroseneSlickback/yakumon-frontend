import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CenterButtonDiv,
  EditDeleteButtonDiv,
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
  TopH1,
} from "../../Components/Page-accessories";
import AuthContext from "../../Utilities/AuthContext";
import { ReturnUserType } from "../../Utilities/types";
import { FillerImgSvg } from "../../Utilities/Images/SVGComponents/FillerImgSvg";
import location from "../../Utilities/Images/SVGs/location.svg";
import clock from "../../Utilities/Images/SVGs/clock.svg";
import phone from "../../Utilities/Images/SVGs/phone.svg";
import site from "../../Utilities/Images/SVGs/site.svg";
import StoreHour from "../../Components/StoreHour";
import AccordionModal from "../../Modules/Modals/AccordionModal";
import { BackDrop } from "../../Components/Backdrop";
import {
  DeleteModal,
  DoubleConfirmDeleteModal,
} from "../../Modules/Modals/DeleteModals";

const weekdaysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const OwnerSection = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<ReturnUserType | null>(null);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [storeToDelete, setStoreToDelete] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

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

  const editStore = (storeId: string) => {
    navigate(`/portal/editStore/${storeId}`);
  };

  const closeModal = () => {
    setStoreToDelete(null);
    setConfirmDelete(false);
  };

  const toggleConfirm = () => {
    setConfirmDelete(true);
  };

  const deleteStore = (storeId: string) => {
    setStoreToDelete(storeId);
  };

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
            <TopH1>Welcome, {authContext.user?.firstName}</TopH1>
          </PageSectionCard>
          {!user
            ? null
            : !user.ownedStores
            ? null
            : user.ownedStores.map((store, storeIndex) => {
                return (
                  <PageSectionCard styled ownerSection key={storeIndex}>
                    <TopH1 storePage>{store.storeName}</TopH1>
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
                    <AccordionModal buttonMessage="View Employees">
                      {store.employees.map((employee, index) => {
                        return (
                          <div key={index}>
                            <Link to={`/reservation/${employee._id}`}>
                              {employee.firstName} {employee.lastName}
                            </Link>
                          </div>
                        );
                      })}
                    </AccordionModal>
                    <EditDeleteButtonDiv>
                      <SmallButton
                        nonConstraint
                        onClick={() => editStore(store._id)}
                      >
                        Edit Store
                      </SmallButton>
                      <SmallButton
                        warning
                        nonConstraint
                        onClick={() => deleteStore(store._id)}
                      >
                        Delete
                      </SmallButton>
                    </EditDeleteButtonDiv>
                  </PageSectionCard>
                );
              })}
          <PageSectionCard secondary>
            <CenterButtonDiv>
              <StyledLinkButton to="/portal/newstore">
                Create New Store
              </StyledLinkButton>
            </CenterButtonDiv>
          </PageSectionCard>
        </>
      )}
      {storeToDelete || confirmDelete ? (
        <BackDrop onClick={closeModal} />
      ) : null}
      {storeToDelete && !confirmDelete ? (
        <DeleteModal
          type="store"
          id={storeToDelete}
          title="Delete Store"
          subTitle="Do you want to delete this store?"
          toggleConfirm={toggleConfirm}
          closeModal={closeModal}
        />
      ) : null}
      {confirmDelete && confirmDelete ? (
        <DoubleConfirmDeleteModal
          type="store"
          id={storeToDelete}
          title="Confirm Store Delete"
          subTitle="Are you sure that you want to delete this store?"
          toggleConfirm={toggleConfirm}
          closeModal={closeModal}
        />
      ) : null}
    </SinglePageContainer>
  );
};

export default OwnerSection;
