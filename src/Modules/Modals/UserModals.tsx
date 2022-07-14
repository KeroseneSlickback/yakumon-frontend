import axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import { StoreImgDiv } from "../../Components/Containers";
import {
  StyledModalForm,
  StyledModalBlock,
  StyledImgInput,
  StyledLabel,
  StyledTextInput,
} from "../../Components/FormComponents";
import {
  ButtonBox,
  ModalContainer,
  ModalH3,
} from "../../Components/ModalComponents";
import {
  LoadingIcon,
  LoadingIconContainer,
  StoreImg,
} from "../../Components/Page-accessories";
import AuthContext from "../../Utilities/AuthContext";
import { FillerImgSvg } from "../../Utilities/Images/SVGComponents/FillerImgSvg";
import {
  BackendResponseDataType,
  EditUserType,
  MessageType,
  UserType,
} from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

interface Props {
  closeModal(): void;
  confirmDelete?: () => void;
  userId?: string | boolean;
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
      <StyledModalForm onSubmit={handleSubmit}>
        <StyledModalBlock sideBySide>
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
        </StyledModalBlock>
        <StyledModalBlock sideBySide>
          <div>
            <StyledLabel>Phone number</StyledLabel>
            <StyledTextInput
              name="phoneNumber"
              type="text"
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
        </StyledModalBlock>
        <StyledModalBlock>
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
        </StyledModalBlock>
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
      </StyledModalForm>
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
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<MessageType | null>(null);
  const [formError, setFormError] = useState<MessageType | null>(null);
  const [title, setTitle] = useState<string>("");
  const [displayImg, setDisplayImg] = useState<string>("");
  const [image, setImage] = useState("");

  const handleImageUpload = (e: any) => {
    setImage(e.target.files[0]);
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
    setFormError(null);
    const jwt = localStorage.getItem("jwt");

    const imageInputted = await checkImg(image);
    const imageFormData = new FormData();
    imageFormData.append("picture", image);
    let sendingObj = {
      title: "",
    };
    let sendingObjCheck = false;

    if (title !== "") {
      sendingObj.title = title;
      sendingObjCheck = true;
    }

    if (!imageInputted && sendingObjCheck) {
      setFormError({
        message: "Nothing to edit",
        warning: true,
      });
    }

    try {
      if (imageInputted) {
        axios.patch<BackendResponseDataType>(
          "http://localhost:8888/user/picture",
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
      }
      if (sendingObjCheck) {
        axios.patch<BackendResponseDataType>(
          "http://localhost:8888/user",
          sendingObj,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
      }
      setFormError({
        message: "User updated",
        warning: false,
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (e) {
      setFormError({
        message: "An Error had Occured",
        warning: true,
      });
    }
  };

  useEffect(() => {
    setLoad(true);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<UserType>(`http://localhost:8888/user/${props.userId}`)
          .then((res) => {
            setLoad(false);
            if (res.data.picture) {
              setDisplayImg(res.data.picture.toString("base64"));
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
      ) : (
        <>
          <ModalH3 paddingBottom>Employee Edit</ModalH3>
          <h4>Please add or edit your title and picture.</h4>
          <StyledModalForm onSubmit={handleSubmit}>
            <StyledModalBlock>
              <StyledLabel>Title</StyledLabel>
              <StyledTextInput
                name="title"
                type="text"
                placeholder="Senior Hair Stylist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </StyledModalBlock>
            <StyledModalBlock>
              <div>
                <StoreImgDiv rearPortal>
                  {displayImg ? (
                    <StoreImg
                      rearPortal
                      src={`data:image/png;base64,${displayImg}`}
                    />
                  ) : (
                    <FillerImgSvg rearPortal />
                  )}
                </StoreImgDiv>
              </div>
              <div>
                <StyledLabel>Employee Image</StyledLabel>
                <p>
                  Please upload a jpg, jpeg, or png image under 200kb only.
                  Photos with a 1/1 aspect ratio work best.
                </p>
                <StyledImgInput
                  type="file"
                  name="picture"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                />
              </div>
            </StyledModalBlock>

            {formError ? (
              <MessageBox marginTop>
                <RegularMessage
                  message={formError.message}
                  warning={formError.warning}
                />
              </MessageBox>
            ) : null}
            <ButtonBox topPadding>
              <MediumButton register>Submit</MediumButton>
            </ButtonBox>
          </StyledModalForm>
        </>
      )}
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};
