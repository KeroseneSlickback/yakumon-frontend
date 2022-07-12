import React, { ChangeEvent, useEffect, useState } from "react";
import { ReserveButton } from "../../Components/Buttons";
import {
  StoreHourContainer,
  StoreHourGrid,
  StyledForm,
  StyledFormBlock,
  StyledFormSelect,
  StyledImgInput,
  StyledLabel,
  StyledTextArea,
  StyledTextInput,
} from "../../Components/FormComponents";
import { ButtonBox } from "../../Components/ModalComponents";
import { CreateStoreType, MessageType, StoreType } from "../../Utilities/types";
import RegularMessage, {
  MessageBox,
} from "../../Modules/Messages/RegularMessage";
import {
  CheckboxSpan,
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import {
  DetailP,
  LoadingIcon,
  LoadingIconContainer,
  TopH1,
  TopH2,
} from "../../Components/Page-accessories";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  daysArray,
  hoursArray,
  listHoursArray,
} from "../../Utilities/Helpers/HelperObjArrays";

const NewStorePortal = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [message, setMessage] = useState<MessageType | null>(null);
  const [formData, setFormData] = useState<CreateStoreType>({
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
  const [image, setImage] = useState("");
  const [alteredHours, setAlteredHours] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

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
    setFormData((prev) => ({
      ...prev,
      hours: prev.hours.map((hour, index) => {
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
      hours: prev.hours.map((hour, index) => {
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
    // quick edit, check later
    for (let i = 0; i < data.hours.length; i++) {
      const day = data.hours[i];
      for (let key in day) {
        if (day[key] === "") {
          evaluation = false;
          return;
        }
      }
    }
    if (evaluation) {
      setAlteredHours(false);
    }
    return evaluation;
  };

  const splitObjects = (data: CreateStoreType) => {
    let simpleObj = {
      storeName: data.storeName,
      storeType: data.storeType,
      storeDescription: data.storeDescription,
      storeWebsite: data.storeWebsite,
      location: data.location,
      locationLink: data.locationLink,
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

  const verifyFormObject = async (data: CreateStoreType) => {
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

    const imageInputted = await checkImg(image);

    if (!hourEvaluation && alteredHours) {
      setMessage({
        message: "Enter all hours for store",
        warning: true,
      });
    } else if (!objectEvaluation || !hourEvaluation || !imageInputted) {
      setMessage({
        message: "Please enter the store infomation",
        warning: true,
      });
    }

    if (objectEvaluation && hourEvaluation && imageInputted) {
      axios
        .post<StoreType>("http://localhost:8888/store", returnObject, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            const storeId = res.data._id;
            axios
              .patch<StoreType>(
                `http://localhost:8888/store/${storeId}/picture`,
                imageFormData,
                {
                  headers: {
                    Authorization: `Bearer ${jwt}`,
                  },
                }
              )
              .then((res) => {
                if (res.status === 200) {
                  setMessage({
                    message: "Store Created Successfully",
                    warning: false,
                  });
                }
                setTimeout(() => {
                  navigate(`/store/${res.data._id}`);
                }, 2000);
              })
              .catch((e) => {
                setMessage({
                  message: `${e.response.data.error}`,
                  warning: true,
                });
              });
          }
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
          <PageSectionCard>
            <TopH1>Create a Store</TopH1>
          </PageSectionCard>
          <PageSectionCard styled>
            <StyledFormBlock>
              <StyledLabel>Store Name:</StyledLabel>
              <StyledTextInput
                required
                name="storeName"
                type="text"
                placeholder="FantasticSam"
                value={formData.storeName}
                onChange={handleFormChange}
              />
            </StyledFormBlock>
            <StyledFormBlock>
              <StyledLabel>Store Type:</StyledLabel>
              <StyledFormSelect
                required
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
            </StyledFormBlock>
            <StyledFormBlock>
              <StyledLabel>Store Description:</StyledLabel>
              <StyledTextArea
                required
                large
                name="storeDescription"
                placeholder="A simple store created from our wish to provide the best experience..."
                value={formData.storeDescription}
                onChange={handleFormChange}
              ></StyledTextArea>
            </StyledFormBlock>
            <StyledFormBlock></StyledFormBlock>
          </PageSectionCard>
          <PageSectionCard>
            <StyledFormBlock>
              <StyledLabel>Store Website:</StyledLabel>
              <DetailP>Please provide a clickable URL</DetailP>
              <StyledTextInput
                required
                name="storeWebsite"
                type="text"
                placeholder="https://www.fantasticsams.com/"
                value={formData.storeWebsite}
                onChange={handleFormChange}
              />
            </StyledFormBlock>
            <StyledFormBlock>
              <StyledLabel>Store Location:</StyledLabel>
              <DetailP>Please provide a written address</DetailP>
              <StyledTextInput
                required
                name="location"
                type="text"
                placeholder="7772 West Avantage Lane, Las Vegas NV 82813"
                value={formData.location}
                onChange={handleFormChange}
              />
            </StyledFormBlock>
            <StyledFormBlock>
              <StyledLabel>Store Location Link:</StyledLabel>
              <DetailP>
                Please provide a sharable link from Google Maps to your location
              </DetailP>
              <StyledTextInput
                required
                name="locationLink"
                type="text"
                placeholder="https://goo.gl/maps/GL3wmq1RmqUR84ns9"
                value={formData.locationLink}
                onChange={handleFormChange}
              />
            </StyledFormBlock>
            <StyledFormBlock>
              <StyledLabel>Phone Number</StyledLabel>
              <StyledTextInput
                required
                name="phoneNumber"
                type="text"
                placeholder="1 (702) 992-8282"
                value={formData.phoneNumber}
                onChange={handleFormChange}
              />
            </StyledFormBlock>
          </PageSectionCard>
          <PageSectionCard styled>
            <StyledFormBlock>
              <TopH2>Hours:</TopH2>
              {formData.hours?.map((day, dayIndex) => {
                return (
                  <StoreHourContainer key={dayIndex}>
                    <h4>{daysArray[dayIndex]}</h4>
                    <StoreHourGrid>
                      <span>
                        <DetailP>Open</DetailP>
                        <StyledFormSelect
                          compact
                          required
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
                        <DetailP>Close</DetailP>
                        <StyledFormSelect
                          compact
                          required
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
                        <DetailP>Closed?</DetailP>
                        <input
                          name="closed"
                          type="checkbox"
                          checked={day.closed}
                          onChange={(e) => handleCheckboxChange(e, dayIndex)}
                        />
                      </CheckboxSpan>
                    </StoreHourGrid>
                  </StoreHourContainer>
                );
              })}
            </StyledFormBlock>
          </PageSectionCard>
          <PageSectionCard>
            <StyledFormBlock extraBottomPadding>
              <StyledLabel>Store Image</StyledLabel>
              <DetailP>
                Please upload a jpg, jpeg, or png image under 200kb only. Photos
                with a 1/1 aspect ratio work best.
              </DetailP>
              <StyledImgInput
                type="file"
                name="picture"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageUpload}
              />
            </StyledFormBlock>
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
              <ReserveButton register>Create Store</ReserveButton>
            </ButtonBox>
          </PageSectionCard>
        </StyledForm>
      )}
    </SinglePageContainer>
  );
};

export default NewStorePortal;
