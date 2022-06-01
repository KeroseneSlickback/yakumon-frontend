import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReserveButton } from "../../Components/Buttons";
import {
  FormH1,
  StyledForm,
  StyledFormSelect,
  StyledImgInput,
  StyledLabel,
  StyledTextArea,
  StyledTextInput,
} from "../../Components/FormComponents";
import { ButtonBox } from "../../Components/ModalComponents";
import {
  BackendResponseDataType,
  CreateStoreType,
  EditStoreType,
  MessageType,
  ReturnStoreType,
  StoreDayHour,
} from "../../Utilities/types";
import RegularMessage, {
  MessageBox,
} from "../../Modules/Messages/RegularMessage";
import {
  CheckboxSpan,
  PageSectionCard,
  SinglePageContainer,
  StoreEditContainer,
  StoreImgDiv,
  StoreInfoContainer,
} from "../../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
  StoreHourTable,
  StoreImg,
} from "../../Components/Page-accessories";
import axios from "axios";
import { FillerImgSvg } from "../../Utilities/Images/SVGComponents/FillerImgSvg";
import location from "../../Utilities/Images/SVGs/location.svg";
import clock from "../../Utilities/Images/SVGs/clock.svg";
import phone from "../../Utilities/Images/SVGs/phone.svg";
import site from "../../Utilities/Images/SVGs/site.svg";
import StoreHour from "../../Components/StoreHour";
import AccordionModal from "../../Modules/Modals/AccordionModal";

const daysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const hoursArray = [
  "1",
  "1:30",
  "2",
  "2:30",
  "3",
  "3:30",
  "4",
  "4:30",
  "5",
  "5:30",
  "6",
  "6:30",
  "7",
  "7:30",
  "8",
  "8:30",
  "9",
  "9:30",
  "10",
  "10:30",
  "11",
  "11:30",
  "12",
  "12:30",
  "13",
  "13:30",
  "14",
  "14:30",
  "15",
  "15:30",
  "16",
  "16:30",
  "17",
  "17:30",
  "18",
  "18:30",
  "19",
  "19:30",
  "20",
  "20:30",
  "21",
  "21:30",
  "22",
  "22:30",
  "23",
  "23:30",
  "24",
  "24:30",
];

const listHoursArray = [
  "1 am",
  "1:30 am",
  "2 am",
  "2:30 am",
  "3 am",
  "3:30 am",
  "4 am",
  "4:30 am",
  "5 am",
  "5:30 am",
  "6 am",
  "6:30 am",
  "7 am",
  "7:30 am",
  "8 am",
  "8:30 am",
  "9 am",
  "9:30 am",
  "10 am",
  "10:30 am",
  "11 am",
  "11:30 am",
  "12 pm",
  "12:30 pm",
  "1 pm",
  "1:30 pm",
  "2 pm",
  "2:30 pm",
  "3 pm",
  "3:30 pm",
  "4 pm",
  "4:30 pm",
  "5 pm",
  "5:30 pm",
  "6 pm",
  "6:30 pm",
  "7 pm",
  "7:30 pm",
  "8 pm",
  "8:30 pm",
  "9 pm",
  "9:30 pm",
  "10 pm",
  "10:30 pm",
  "11 pm",
  "11:30 pm",
  "12 pm",
  "12:30 pm",
];

const weekdaysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const EditStorePortal = () => {
  const { id } = useParams();
  const [store, setStore] = useState<ReturnStoreType | null>(null);
  const [storeImg, setStoreImg] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageType | null>(null);
  const [formError, setFormError] = useState<string | null>("");
  const [formData, setFormData] = useState<EditStoreType>({
    storeName: "",
    storeType: "",
    storeDescription: "",
    storeWebsite: "",
    location: "",
    locationLink: "",
    phoneNumber: "",
    hours: [
      { closed: false, open: "", close: "" },
      { closed: false, open: "", close: "" },
      { closed: false, open: "", close: "" },
      { closed: false, open: "", close: "" },
      { closed: false, open: "", close: "" },
      { closed: false, open: "", close: "" },
      { closed: false, open: "", close: "" },
    ],
  });
  const [alteredHours, setAlteredHours] = useState(false);
  const [image, setImage] = useState("");

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
  }, [id]);

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHoursChange = (
    e: ChangeEvent<HTMLSelectElement>,
    dayIndex: number
  ) => {
    const { name, value } = e.target;
    setAlteredHours(true);
    setFormData((prev) => ({
      ...prev,
      hours: prev.hours?.map((hour, index) => {
        if (index === dayIndex) {
          return { ...hour, [name]: value };
        }
        return hour;
      }),
    }));
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    dayIndex: number
  ) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      hours: prev.hours?.map((hour, index) => {
        if (index === dayIndex) {
          return { ...hour, [name]: checked };
        }
        return hour;
      }),
    }));
  };

  const handleImageUpload = (e: any) => {
    setImage(e.target.files[0]);
  };

  const checkHourArray = (data: any) => {
    let evaluation = true;
    data.hours.map((day: any) => {
      for (let key in day) {
        if (day[key] === "") {
          evaluation = false;
          return;
        }
      }
    });
    if (evaluation) {
      setAlteredHours(false);
    }
    return evaluation;
  };

  const splitObjects = (data: EditStoreType) => {
    let simpleObj = {
      storeName: data.storeName,
      storeType: data.storeType,
      storeDescription: data.storeDescription,
      storeWebsite: data.storeWebsite,
      location: data.location,
      phoneNumber: data.phoneNumber,
    };
    let hourObj = {
      hours: data.hours,
    };
    return {
      simpleObj,
      hourObj,
    };
  };

  const verifyFormObject = async (data: EditStoreType) => {
    const { simpleObj, hourObj }: { simpleObj: any; hourObj: any } =
      await splitObjects(data);

    let returnObject: any = {};
    let objectEvaluation = true;
    let hourEvaluation = true;

    for (let key in simpleObj) {
      if (simpleObj[key] !== "") {
        returnObject[key] = simpleObj[key];
      }
    }
    if (Object.keys(returnObject).length === 0) {
      objectEvaluation = false;
    }
    if (!checkHourArray(data)) {
      hourEvaluation = false;
    } else {
      setAlteredHours(true);
      returnObject = {
        ...returnObject,
        ...hourObj,
      };
    }
    return { returnObject, objectEvaluation, hourEvaluation };
  };

  const checkImg = (img: string) => {
    if (img === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    const jwt = localStorage.getItem("jwt");
    const imageFormData = new FormData();
    imageFormData.append("picture", image);

    const shallowFormData = { ...formData };

    const { returnObject, objectEvaluation, hourEvaluation } =
      await verifyFormObject(shallowFormData);
    console.log(returnObject, objectEvaluation, hourEvaluation);

    const imageInputted = await checkImg(image);

    if (!hourEvaluation && alteredHours) {
      setMessage({
        message: "Enter all hours for store",
        warning: true,
      });
    } else if (!objectEvaluation && !hourEvaluation && !imageInputted) {
      setMessage({
        message: "No updates to submit",
        warning: true,
      });
    }

    try {
      if (objectEvaluation || hourEvaluation) {
        console.log("good object or good hours");
        axios.patch<ReturnStoreType>(
          `http://localhost:8888/store/${id}`,
          returnObject,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
      }
      if (imageInputted) {
        console.log("image uploaded");
        axios.patch<BackendResponseDataType>(
          `http://localhost:8888/store/${id}/picture`,
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
      }
      setMessage({
        message: "Store Updated Successfully",
        warning: false,
      });
    } catch (e) {
      setMessage({
        message: "An Error has Occured",
        warning: true,
      });
    }
  };

  return (
    <SinglePageContainer>
      {load ? (
        <LoadingIconContainer absolute>
          <LoadingIcon />
        </LoadingIconContainer>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <PageSectionCard formFormatting>
            <FormH1 pageSection>Edit Store</FormH1>
            <h4>Please change the infomation below as you wish</h4>
          </PageSectionCard>
          <PageSectionCard styled formFormatting>
            <StoreEditContainer topCard>
              <h2>{store?.storeName}</h2>
              <h3>Type: {store?.storeType}</h3>
              <h5>Description:</h5>
              <p>{store?.storeDescription}</p>
            </StoreEditContainer>
            <div>
              <StyledLabel>Store Name:</StyledLabel>
              <StyledTextInput
                name="storeName"
                type="text"
                placeholder="FantasticSam"
                value={formData.storeName}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <StyledLabel>Store Type:</StyledLabel>
              <StyledFormSelect
                name="storeType"
                value={formData.storeType}
                onChange={handleFormChange}
              >
                <option value="" disabled>
                  Select a Type
                </option>
                <option value="Hair Salon">Hair</option>
                <option value="Nail Salon">Nail</option>
                <option value="Facial Salon">Facial</option>
                <option value="Tanning Salon">Tanning</option>
                <option value="Waxing/Hair-Removal Salon">
                  Waxing/Hair-Removal
                </option>
                <option value="Massage Salon">Massage Salon</option>
              </StyledFormSelect>
            </div>
            <div>
              <StyledLabel>Store Description:</StyledLabel>
              <StyledTextArea
                large
                name="storeDescription"
                placeholder="A simple store created from our wish to provide the best experience..."
                value={formData.storeDescription}
                onChange={handleFormChange}
              ></StyledTextArea>
            </div>
          </PageSectionCard>
          <PageSectionCard formFormatting>
            <StoreEditContainer>
              <StoreInfoContainer ownerSection>
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
              </StoreInfoContainer>
            </StoreEditContainer>
            <div>
              <StyledLabel>Store Website:</StyledLabel>
              <p>Please provide a clickable URL</p>
              <StyledTextInput
                name="storeWebsite"
                type="text"
                placeholder="https://www.fantasticsams.com/"
                value={formData.storeWebsite}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <StyledLabel>Store Location:</StyledLabel>
              <p>Please provide a written address</p>
              <StyledTextInput
                name="location"
                type="text"
                placeholder="7772 West Avantage Lane, Las Vegas NV 82813"
                value={formData.location}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <StyledLabel>Store Location Link:</StyledLabel>
              <p>
                Please provide a sharable link from Google Maps to your location
              </p>
              <StyledTextInput
                name="locationLink"
                type="text"
                placeholder="https://goo.gl/maps/GL3wmq1RmqUR84ns9"
                value={formData.locationLink}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <StyledLabel>Phone Number</StyledLabel>
              <StyledTextInput
                name="phoneNumber"
                type="text"
                placeholder="1 (702) 992-8282"
                value={formData.phoneNumber}
                onChange={handleFormChange}
              />
            </div>
          </PageSectionCard>
          <PageSectionCard styled formFormatting>
            <StoreEditContainer>
              <StoreInfoContainer ownerSection>
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
            </StoreEditContainer>
            <div>
              <StyledLabel>Hours:</StyledLabel>
              <p>
                If changing hours, please input all hours for each day again.
              </p>
              {formData.hours?.map((day, dayIndex) => {
                return (
                  <div key={dayIndex}>
                    <h4>{daysArray[dayIndex]}</h4>
                    <div>
                      <span>
                        <p>Open</p>
                        <StyledFormSelect
                          compact
                          name="open"
                          value={day.open}
                          onChange={(e) => handleHoursChange(e, dayIndex)}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {hoursArray.map((hour, hourIndex) => {
                            return (
                              <option key={hourIndex} value={hour}>
                                {listHoursArray[hourIndex]}
                              </option>
                            );
                          })}
                        </StyledFormSelect>
                      </span>
                      <span>
                        <p>Close</p>
                        <StyledFormSelect
                          compact
                          name="close"
                          value={day.close}
                          onChange={(e) => handleHoursChange(e, dayIndex)}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {hoursArray.map((hour, hourIndex) => {
                            return (
                              <option key={hourIndex} value={hour}>
                                {listHoursArray[hourIndex]}
                              </option>
                            );
                          })}
                        </StyledFormSelect>
                      </span>
                      <CheckboxSpan>
                        <p>Closed?</p>
                        <input
                          name="closed"
                          type="checkbox"
                          checked={day.closed}
                          onChange={(e) => handleCheckboxChange(e, dayIndex)}
                        />
                      </CheckboxSpan>
                    </div>
                  </div>
                );
              })}
            </div>
          </PageSectionCard>
          <PageSectionCard formFormatting>
            <StoreImgDiv ownerSection>
              {storeImg ? (
                <StoreImg
                  ownerSection
                  src={`data:image/png;base64,${storeImg}`}
                />
              ) : (
                <FillerImgSvg ownerSection />
              )}
            </StoreImgDiv>
            <div>
              <StyledLabel>Store Image</StyledLabel>
              <p>
                Please upload a jpg, jpeg, or png image under 200kb only. Photos
                with a 1/1 aspect ratio work best.
              </p>
              <StyledImgInput
                type="file"
                name="picture"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageUpload}
              />
            </div>
          </PageSectionCard>
          <PageSectionCard secondary>
            {message ? (
              <MessageBox>
                <RegularMessage
                  message={message.message}
                  warning={message.warning}
                />
              </MessageBox>
            ) : null}
            <ButtonBox centered>
              <ReserveButton register>Edit Store</ReserveButton>
            </ButtonBox>
          </PageSectionCard>

          {formError ? (
            <MessageBox>
              <RegularMessage message={formError} warning={true} />
            </MessageBox>
          ) : null}
        </StyledForm>
      )}
    </SinglePageContainer>
  );
};

export default EditStorePortal;
