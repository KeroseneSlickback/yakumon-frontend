import React, { ChangeEvent, useState } from "react";
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

const NewStoreModal = ({ closeModal }: ModalCloseProp) => {
  const [formError, setFormError] = useState<string | null>("");
  const [formData, setFormData] = useState<CreateStoreType>({
    storeName: "",
    storeType: "",
    storeDescription: "",
    storeWebsite: "",
    location: "",
    locationLink: "",
    phoneNumber: "",
    hours: [],
  });

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <ModalContainer>
      <h3>Create a Store</h3>
      <h4>Please enter the infomation below to create a store</h4>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormBlock>
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
              name="storeDescription"
              placeholder="A simple store created from our wish to provide the best experience..."
              value={formData.storeDescription}
              onChange={handleFormChange}
            ></StyledTextArea>
          </div>
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
        </StyledFormBlock>
        {formError ? (
          <MessageBox>
            <RegularMessage message={formError} warning={true} />
          </MessageBox>
        ) : null}
      </StyledForm>
      <ClosedButtonDiv>
        <CloseButton onClick={closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export default NewStoreModal;
