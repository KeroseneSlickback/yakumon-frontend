import React, { ChangeEvent, useEffect, useState } from "react";
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
import { ButtonBox, ModalContainer } from "../../Components/ModalComponents";
import {
  BackendResponseDataType,
  CreateStoreType,
  MessageType,
  ReturnStoreType,
} from "../../Utilities/types";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [formError, setFormError] = useState<string | null>("");
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const imageFormData = new FormData();
    imageFormData.append("picture", image);
    setMessage(null);
    axios
      .post<ReturnStoreType>("http://localhost:8888/store", formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          const storeId = res.data._id;
          axios
            .patch<ReturnStoreType>(
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
              console.log(e);
              setMessage({
                message: "An Error has Occured",
                warning: true,
              });
            });
        }
      });
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
            <FormH1 pageSection>Create a Store</FormH1>
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
                required
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
                placeholder="1 (702) 992-8282"
                value={formData.phoneNumber}
                onChange={handleFormChange}
              />
            </div>
          </PageSectionCard>
          <PageSectionCard styled formFormatting>
            <div>
              <StyledLabel>Hours:</StyledLabel>
              {formData.hours?.map((day, dayIndex) => {
                return (
                  <div key={dayIndex}>
                    <h4>{daysArray[dayIndex]}</h4>
                    <div>
                      <span>
                        <p>Open</p>
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
                        <p>Close</p>
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
                // required
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
              <ReserveButton register>Create Store</ReserveButton>
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

export default NewStorePortal;
