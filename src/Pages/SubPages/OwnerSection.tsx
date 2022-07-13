import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CenterButtonDiv,
  EditDeleteButtonDiv,
  EmptyButton,
  SmallButton,
  StyledLinkButton,
} from "../../Components/Buttons";
import {
  ExtraPaddingWrapper,
  OwnerShowcaseGrid,
  PageSectionCard,
  SinglePageContainer,
  StoreImgDiv,
  StoreInfoContainer,
} from "../../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
  StoreHourTable,
  StoreImg,
  TopH1,
} from "../../Components/Page-accessories";
import AuthContext from "../../Utilities/AuthContext";
import { MessageType, UserType } from "../../Utilities/types";
import { FillerImgSvg } from "../../Utilities/Images/SVGComponents/FillerImgSvg";
import location from "../../Utilities/Images/SVGs/location.svg";
import clock from "../../Utilities/Images/SVGs/clock.svg";
import phone from "../../Utilities/Images/SVGs/phone.svg";
import site from "../../Utilities/Images/SVGs/site.svg";
import StoreHour from "../../Components/StoreHour";
import AccordionModal from "../../Modules/Modals/AccordionModal";
import { BackDrop } from "../../Components/Backdrop";
import {
  DeleteStoreModal,
  DoubleConfirmDeleteStoreModal,
} from "../../Modules/Modals/DeleteStoreModals";
import close from "../../Utilities/Images/SVGs/close.svg";
import RemoveEmployeeModal from "../../Modules/Modals/RemoveEmployeeModal";
import RegularMessage, {
  MessageBox,
} from "../../Modules/Messages/RegularMessage";
import AddEmployeeModal from "../../Modules/Modals/AddEmployeeModal";

const weekdaysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

interface RemoveEmployeeProps {
  storeId: string;
  employeeId: string;
}

const OwnerSection = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<MessageType | null>(null);
  const [storeToDelete, setStoreToDelete] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [addEmployee, setAddEmployee] = useState<string | null>(null);
  const [removeEmployee, setRemoveEmployee] =
    useState<RemoveEmployeeProps | null>(null);

  useEffect(() => {
    const owner = JSON.parse(localStorage.getItem("user") as string);

    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<UserType>(`http://localhost:8888/user/${owner?._id}`)
          .then((response) => {
            setLoad(false);
            response.data.ownedStores?.forEach((store) => {
              if (store.picture) {
                store.picture.toString("base64");
              }
            });
            setUser(response.data);
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
  }, []);

  const editStore = (storeId: string) => {
    navigate(`/portal/editStore/${storeId}`);
  };

  const closeModal = () => {
    setStoreToDelete(null);
    setConfirmDelete(false);
    setRemoveEmployee(null);
    setAddEmployee(null);
  };

  const toggleConfirm = () => {
    setConfirmDelete(true);
  };

  const deleteStore = (storeId: string) => {
    setStoreToDelete(storeId);
  };

  const toggleRemoveEmployee = (employeeId: string, storeId: string) => {
    setRemoveEmployee({ storeId, employeeId });
  };

  const toggleAddEmployee = (storeId: string) => {
    setAddEmployee(storeId);
  };

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
          <PageSectionCard title>
            <TopH1>Welcome, {authContext.user?.firstName}</TopH1>
          </PageSectionCard>
          <OwnerShowcaseGrid>
            {!user
              ? null
              : !user.ownedStores
              ? null
              : user.ownedStores.map((store, storeIndex) => {
                  return (
                    <PageSectionCard styled tabletGrid key={storeIndex}>
                      <div>
                        <TopH1>{store.storeName}</TopH1>
                        <StoreImgDiv rearPortal>
                          {store.picture ? (
                            <StoreImg
                              rearPortal
                              src={`data:image/png;base64,${store.picture}`}
                              alt={store.storeName}
                            />
                          ) : (
                            <FillerImgSvg rearPortal />
                          )}
                        </StoreImgDiv>
                      </div>
                      <StoreInfoContainer rearPortal>
                        <div>
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
                      <AccordionModal buttonMessage="View Employees">
                        {store.employees.map((employee, index) => {
                          return (
                            <div key={index}>
                              <Link to={`/reservation/${employee._id}`}>
                                {employee.firstName} {employee.lastName}
                              </Link>
                              <EmptyButton
                                onClick={() =>
                                  toggleRemoveEmployee(employee._id, store._id)
                                }
                              >
                                <img src={close} alt="remove employee" />
                              </EmptyButton>
                            </div>
                          );
                        })}
                        <SmallButton
                          onClick={() => toggleAddEmployee(store._id)}
                          bottomPadding
                        >
                          Add Employee
                        </SmallButton>
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
          </OwnerShowcaseGrid>
          <PageSectionCard secondary disconnectedSubmit>
            <CenterButtonDiv>
              <StyledLinkButton to="/portal/newstore">
                Create New Store
              </StyledLinkButton>
            </CenterButtonDiv>
          </PageSectionCard>
        </>
      )}
      {storeToDelete || confirmDelete || removeEmployee || addEmployee ? (
        <BackDrop onClick={closeModal} />
      ) : null}
      {addEmployee ? (
        <AddEmployeeModal storeId={addEmployee} closeModal={closeModal} />
      ) : null}
      {storeToDelete && !confirmDelete ? (
        <DeleteStoreModal
          type="store"
          id={storeToDelete}
          title="Delete Store"
          subTitle="Do you want to delete this store?"
          toggleConfirm={toggleConfirm}
          closeModal={closeModal}
        />
      ) : null}
      {confirmDelete && confirmDelete ? (
        <DoubleConfirmDeleteStoreModal
          type="store"
          id={storeToDelete}
          title="Confirm Store Delete"
          subTitle="Are you sure that you want to delete this store?"
          toggleConfirm={toggleConfirm}
          closeModal={closeModal}
        />
      ) : null}
      {removeEmployee ? (
        <RemoveEmployeeModal
          employeeId={removeEmployee.employeeId}
          storeId={removeEmployee.storeId}
          closeModal={closeModal}
        />
      ) : null}
    </SinglePageContainer>
  );
};

export default OwnerSection;
