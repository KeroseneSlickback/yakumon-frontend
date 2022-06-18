import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import {
  StyledForm,
  StyledFormBlock,
  StyledFormSelect,
  StyledLabel,
  StyledTextInput,
} from "../../Components/FormComponents";
import { ButtonBox, ModalContainer } from "../../Components/ModalComponents";
import { MessageType, ServiceType } from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

interface Props {
  serviceId?: string;
  closeModal(): void;
  service?: ServiceType;
}

interface TempServiceType {
  serviceName?: string;
  timeSpan?: string;
  price?: string;
}

export const NewServiceModal = (props: Props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageType | null>(null);
  const [formData, setFormData] = useState<TempServiceType>({
    serviceName: "",
    timeSpan: "",
    price: "",
  });

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    const jwt = localStorage.getItem("jwt");
    axios
      .post<ServiceType>("http://localhost:8888/service", formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(() => {
        setMessage({
          message: "Successfuly made service",
          warning: false,
        });
        setTimeout(() => {
          navigate(0);
        }, 1500);
      })
      .catch(() => {
        setMessage({
          message: "Error making service",
          warning: true,
        });
      });
  };

  return (
    <ModalContainer>
      <h3>Add New Service</h3>
      <h4>Enter the infomation below to add a service.</h4>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormBlock>
          <div>
            <StyledLabel>Service Name:</StyledLabel>
            <StyledTextInput
              required
              name="serviceName"
              type="text"
              placeholder="Basic Cut"
              value={formData.serviceName}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Price:</StyledLabel>
            <p>Please enter a number with optional periods, no money signs.</p>
            <StyledTextInput
              required
              name="price"
              type="text"
              placeholder="20.00"
              value={formData.price}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Time Span:</StyledLabel>
            <StyledFormSelect
              required
              name="timeSpan"
              value={formData.timeSpan}
              onChange={handleFormChange}
            >
              <option value="" disabled>
                Select a time amount
              </option>
              <option value="1">30 minutes</option>
              <option value="2">1 hour</option>
              <option value="3">1h minutes</option>
              <option value="4">2 hours</option>
              <option value="5">2h 30 minutes</option>
              <option value="6">3 hours</option>
              <option value="7">3h 30 minutes</option>
              <option value="8">4 hours</option>
              <option value="9">4h 30 minutes</option>
              <option value="10">5 hours</option>
            </StyledFormSelect>
          </div>
          {message ? (
            <MessageBox>
              <RegularMessage
                message={message.message}
                warning={message.warning}
              />
            </MessageBox>
          ) : null}
          <ButtonBox>
            <MediumButton register>Add</MediumButton>
          </ButtonBox>
        </StyledFormBlock>
      </StyledForm>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export const EditServiceModal = (props: Props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageType | null>(null);
  const [formData, setFormData] = useState<TempServiceType>({
    serviceName: "",
    timeSpan: "",
    price: "",
  });

  useEffect(() => {
    if (props.service) {
      setFormData({
        serviceName: props.service.serviceName,
        timeSpan: `${props.service.timeSpan}`,
        price: `${props.service.price}`,
      });
    }
  }, [props.service]);

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    const jwt = localStorage.getItem("jwt");
    axios
      .patch<ServiceType>(
        `http://localhost:8888/service/${props.service?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        setMessage({
          message: "Successfuly edited service",
          warning: false,
        });
        setTimeout(() => {
          navigate(0);
        }, 1500);
      })
      .catch(() => {
        setMessage({
          message: "Error editing service",
          warning: true,
        });
      });
  };

  return (
    <ModalContainer>
      <h3>Edit Service</h3>
      <h4>Alter the infomation below to edit service.</h4>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormBlock>
          <div>
            <StyledLabel>Service Name:</StyledLabel>
            <StyledTextInput
              required
              name="serviceName"
              type="text"
              placeholder="Basic Cut"
              value={formData.serviceName}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Price:</StyledLabel>
            <p>Please enter a number with optional periods, no money signs.</p>
            <StyledTextInput
              required
              name="price"
              type="text"
              placeholder="20.00"
              value={formData.price}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Time Span:</StyledLabel>
            <StyledFormSelect
              required
              name="timeSpan"
              value={formData.timeSpan}
              onChange={handleFormChange}
            >
              <option value="" disabled>
                Select a time amount
              </option>
              <option value="1">30 minutes</option>
              <option value="2">1 hour</option>
              <option value="3">1h minutes</option>
              <option value="4">2 hours</option>
              <option value="5">2h 30 minutes</option>
              <option value="6">3 hours</option>
              <option value="7">3h 30 minutes</option>
              <option value="8">4 hours</option>
              <option value="9">4h 30 minutes</option>
              <option value="10">5 hours</option>
            </StyledFormSelect>
          </div>
          {message ? (
            <MessageBox>
              <RegularMessage
                message={message.message}
                warning={message.warning}
              />
            </MessageBox>
          ) : null}
          <ButtonBox>
            <MediumButton register>Add</MediumButton>
          </ButtonBox>
        </StyledFormBlock>
      </StyledForm>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export const RemoveServiceModal = (props: Props) => {
  const [message, setMessage] = useState<MessageType | null>(null);
  const navigate = useNavigate();

  const handleRemoval = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    const jwt = localStorage.getItem("jwt");
    axios
      .delete<ServiceType>(`http://localhost:8888/service/${props.serviceId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(() => {
        setMessage({
          message: "Successfuly removed service",
          warning: false,
        });
        setTimeout(() => {
          navigate(0);
        }, 1500);
      })
      .catch(() => {
        setMessage({
          message: "Error removing service",
          warning: true,
        });
      });
  };

  return (
    <ModalContainer>
      <h3>Remove Service</h3>
      <h4>Are you sure you want to remove this service?</h4>
      {message ? (
        <MessageBox marginTop>
          <RegularMessage message={message.message} warning={message.warning} />
        </MessageBox>
      ) : null}
      <ButtonBox topPadding sideBySide>
        <MediumButton register onClick={handleRemoval}>
          Confirm
        </MediumButton>
        <MediumButton warning onClick={props.closeModal}>
          Close
        </MediumButton>
      </ButtonBox>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};
