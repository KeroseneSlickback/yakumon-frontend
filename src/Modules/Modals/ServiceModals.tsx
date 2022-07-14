import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import {
  StyledModalForm,
  StyledModalBlock,
  StyledFormSelect,
  StyledLabel,
  StyledTextInput,
} from "../../Components/FormComponents";
import {
  ButtonBox,
  ModalContainer,
  ModalH3,
  ModalH4,
} from "../../Components/ModalComponents";
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
      .catch((e) => {
        setMessage({
          message: `${e.response.data.error}`,
          warning: true,
        });
      });
  };

  return (
    <ModalContainer>
      <ModalH3 paddingBottom>Add New Service</ModalH3>
      <ModalH4 paddingBottom>
        Enter the infomation below to add a service.
      </ModalH4>

      <StyledModalForm onSubmit={handleSubmit}>
        <StyledModalBlock>
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
        </StyledModalBlock>
      </StyledModalForm>
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
      .catch((e) => {
        setMessage({
          message: `${e.response.data.error}`,
          warning: true,
        });
      });
  };

  return (
    <ModalContainer>
      <ModalH3 paddingBottom>Edit Service</ModalH3>
      <ModalH4 paddingBottom>
        Alter the infomation below to edit service.
      </ModalH4>

      <StyledModalForm onSubmit={handleSubmit}>
        <StyledModalBlock>
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
              <option value="3">1h 30 minutes</option>
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
        </StyledModalBlock>
      </StyledModalForm>
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
      .catch((e) => {
        setMessage({
          message: `${e.response.data.error}`,
          warning: true,
        });
      });
  };

  return (
    <ModalContainer>
      <ModalH3>Remove Service</ModalH3>
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
