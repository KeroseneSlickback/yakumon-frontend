import axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import {
  StyledForm,
  StyledFormBlock,
  StyledLabel,
  StyledTextInput,
} from "../../Components/FormComponents";
import {
  ButtonBox,
  ModalContainer,
  ModalH3,
} from "../../Components/ModalComponents";
import {
  DetailP,
  LoadingIcon,
  LoadingIconContainer,
} from "../../Components/Page-accessories";
import AuthContext from "../../Utilities/AuthContext";
import {
  BackendResponseDataType,
  MessageType,
  ReturnUserType,
} from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

interface EditUserType {
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
}

interface Props {
  closeModal(): void;
  confirmDelete(): void;
  userId?: string;
}

export const UserModal = (props: Props) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState<EditUserType>({
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<MessageType | null>(null);

  const verifyFormObject = async (data: any) => {
    let returnObject: any = {};
    for (let key in data) {
      if (data[key] !== "") {
        returnObject[key] = data[key];
      }
    }
    return returnObject;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    const jwt = localStorage.getItem("jwt");
    const shallowFormData = { ...formData };
    const verifiedObject = await verifyFormObject(shallowFormData);

    axios
      .patch<BackendResponseDataType>(
        "http://localhost:8888/user",
        verifiedObject,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        setMessage({
          message: "Successfully Edited User!",
          warning: false,
        });
        authContext.login();
        setTimeout(() => {
          navigate(0);
        }, 2000);
      })
      .catch((e) => {
        setMessage({
          message: `${e.response.data.error}`,
          warning: true,
        });
      });
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ModalContainer>
      <ModalH3 paddingBottom>User Settings</ModalH3>
      <p>Enter any infomation you wish to change.</p>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormBlock sideBySide>
          <div>
            <StyledLabel>First name</StyledLabel>
            <StyledTextInput
              name="firstName"
              type="text"
              placeholder="New First Name"
              value={formData.firstName}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Last Name</StyledLabel>
            <StyledTextInput
              name="lastName"
              type="text"
              placeholder="New Last Name"
              value={formData.lastName}
              onChange={handleFormChange}
            />
          </div>
        </StyledFormBlock>

        <StyledFormBlock sideBySide>
          <div>
            <StyledLabel>Phone number</StyledLabel>
            <StyledTextInput
              name="phoneNumber"
              type="number"
              placeholder="111-123-4567"
              value={formData.phoneNumber}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Username</StyledLabel>
            <StyledTextInput
              name="username"
              type="text"
              placeholder="New Username"
              value={formData.username}
              onChange={handleFormChange}
            />
          </div>
        </StyledFormBlock>
        <StyledFormBlock>
          <div>
            <StyledLabel>Email</StyledLabel>
            <StyledTextInput
              name="email"
              type="email"
              placeholder="New email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Password (min 7 characters)</StyledLabel>
            <StyledTextInput
              name="password"
              type="password"
              placeholder="New password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </div>
        </StyledFormBlock>
        {message ? (
          <MessageBox>
            <RegularMessage
              message={message.message}
              warning={message.warning}
            />
          </MessageBox>
        ) : null}
        <ButtonBox smallTopPadding>
          <MediumButton register>Submit Changes</MediumButton>
        </ButtonBox>
      </StyledForm>
      <br />
      <ButtonBox>
        <MediumButton onClick={props.confirmDelete}>
          Delete User Account
        </MediumButton>
      </ButtonBox>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export const UserDeleteConfirm = (props: Props) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleDelete = () => {
    const jwt = localStorage.getItem("jwt");
    setMessage(null);
    axios
      .delete<BackendResponseDataType>(`http://localhost:8888/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(() => {
        setMessage({
          message: "User Deleted Successfully",
          warning: false,
        });
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
        localStorage.removeItem("owner");
        localStorage.removeItem("employee");
        authContext.logout();
        setTimeout(() => {
          navigate(0);
        }, 2000);
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
      <ModalH3 paddingBottom>Delete User Account</ModalH3>
      <h4>Are you sure you want to delete your account?</h4>
      {message ? (
        <MessageBox marginTop>
          <RegularMessage message={message.message} warning={message.warning} />
        </MessageBox>
      ) : null}
      <ButtonBox topPadding sideBySide>
        <MediumButton warning onClick={handleDelete}>
          Delete
        </MediumButton>
        <MediumButton onClick={props.closeModal}>Cancel</MediumButton>
      </ButtonBox>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export const EmployeePatchModal = (props: Props) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState<MessageType | null>(null);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<MessageType | null>(null);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    const jwt = localStorage.getItem("jwt");

    axios
      .patch<BackendResponseDataType>(
        "http://localhost:8888/user",
        verifiedObject,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        setMessage({
          message: "Successfully Edited User!",
          warning: false,
        });
        authContext.login();
        setTimeout(() => {
          navigate(0);
        }, 2000);
      })
      .catch((e) => {
        setMessage({
          message: `${e.response.data.error}`,
          warning: true,
        });
      });
  };

  useEffect(() => {
    setLoad(true);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<ReturnUserType>(`http://localhost:8888/user/${id}`)
          .then((res) => {
            setLoad(false);
            if (res.data.picture) {
              setImage(res.data.picture.toString("base64"));
            }
            if (res.data.title) {
              setTitle(res.data.title);
            }
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
  }, [props.userId]);

  return (
    <ModalContainer>
      {error ? (
        <MessageBox>
          <RegularMessage message={error.message} warning={error.warning} />
        </MessageBox>
      ) : load ? (
        <LoadingIconContainer>
          <LoadingIcon />
        </LoadingIconContainer>
      ) : title ? (
        <>
          <ModalH3 paddingBottom>Employee Edit Section</ModalH3>
          <h4>Please add or edit your title and picture.</h4>
          <StyledForm onSubmit={handleSubmit}></StyledForm>

          {message ? (
            <MessageBox marginTop>
              <RegularMessage
                message={message.message}
                warning={message.warning}
              />
            </MessageBox>
          ) : null}
          <ButtonBox topPadding sideBySide>
            <MediumButton warning onClick={handleDelete}>
              Delete
            </MediumButton>
            <MediumButton onClick={props.closeModal}>Cancel</MediumButton>
          </ButtonBox>
        </>
      ) : null}
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};
