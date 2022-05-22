import React, { ChangeEvent, useEffect, useState } from "react";
import { CloseButton, ClosedButtonDiv } from "../../Components/Buttons";
import {
  StyledForm,
  StyledFormBlock,
  StyledFormSelect,
  StyledLabel,
  StyledTextArea,
  StyledTextInput,
} from "../../Components/FormComponents";
import { ModalContainer } from "../../Components/ModalComponents";
import { CreateStoreType, ModalCloseProp } from "../../Utilities/types";
import RegularMessage, {
  MessageBox,
} from "../../Modules/Messages/RegularMessage";
import {
  CheckboxSpan,
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
} from "../../Components/Page-accessories";

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

const NewStorePortal = () => {
  const [load, setLoad] = useState(true);
  const [formError, setFormError] = useState<string | null>("");
  const [formData, setFormData] = useState<CreateStoreType>({
    storeName: "",
    storeType: "",
    storeDescription: "",
    storeWebsite: "",
    location: "",
    locationLink: "",
    phoneNumber: "",
    sunday: { closed: false, open: "", close: "" },
    monday: { closed: false, open: "", close: "" },
    tuesday: { closed: false, open: "", close: "" },
    wedmesday: { closed: false, open: "", close: "" },
    thursday: { closed: false, open: "", close: "" },
    friday: { closed: false, open: "", close: "" },
    saturday: { closed: false, open: "", close: "" },
  });

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

  const handleHoursChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.name, e.target.value);
  };
  console.log(formData);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
            <h2>Create a Store</h2>
            <h4>Please enter the infomation below to create a store</h4>
          </PageSectionCard>
          <PageSectionCard styled formFormatting>
            <div>
              <StyledLabel>Store Name:</StyledLabel>
              <StyledTextInput
                required
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
            <div>
              <StyledLabel>Store Website:</StyledLabel>
              <p>Please provide a clickable URL</p>
              <StyledTextInput
                required
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
                required
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
                required
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
                required
                name="phoneNumber"
                type="text"
                placeholder="FantasticSam"
                value={formData.phoneNumber}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <StyledLabel>Store Name:</StyledLabel>
              <StyledTextInput
                required
                name="storeName"
                type="text"
                placeholder="FantasticSam"
                value={formData.storeName}
                onChange={handleFormChange}
              />
            </div>
          </PageSectionCard>
          <PageSectionCard styled formFormatting>
            <div>
              <StyledLabel>Hours:</StyledLabel>
              {daysArray.map((day, dayIndex) => {
                return (
                  <div key={dayIndex}>
                    <h4>{day}</h4>
                    <div>
                      <span>
                        <p>Open</p>
                        <StyledFormSelect
                          compact
                          required
                          name="open"
                          value={formData.hours[dayIndex].open}
                          onChange={handleHoursChange}
                        >
                          <option value="" disabled selected>
                            Select
                          </option>
                          {hoursArray.map((hour, hourIndex) => {
                            return (
                              <option
                                key={hourIndex}
                                value={hoursArray[hourIndex]}
                              >
                                {hour}
                              </option>
                            );
                          })}
                        </StyledFormSelect>
                      </span>
                      <span>
                        <p>Close</p>
                        <StyledFormSelect
                          compact
                          required
                          name="close"
                          value={formData.hours[dayIndex].close}
                          onChange={handleHoursChange}
                        >
                          <option value="" disabled selected>
                            Select
                          </option>
                          {hoursArray.map((hour, hourIndex) => {
                            return (
                              <option
                                key={hourIndex}
                                value={hoursArray[hourIndex]}
                              >
                                {hour}
                              </option>
                            );
                          })}
                        </StyledFormSelect>
                      </span>
                      <CheckboxSpan>
                        <p>Closed?</p>
                        <input type="checkbox" />
                      </CheckboxSpan>
                    </div>
                  </div>
                );
              })}
            </div>
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

export default NewStorePortal;
