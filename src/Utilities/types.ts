export interface UserRegisterType {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ReturnUserType {
  firstName: string;
  lastName: string;
  title?: string;
  username: string;
  phoneNumber: string;
  email: string;
  store?: Object[];
  appointments?: Object[];
  services?: Object[];
  picture?: Buffer;
  owner?: boolean;
  admin?: boolean;
  employee?: boolean;
}

export interface BackendResponseDataType {
  success: boolean;
  token: string;
  user: ReturnUserType;
}

export interface ErrorMessage {
  message: string;
  warning: boolean;
}

export interface ModalCloseProp {
  closeModal(): void;
}

export interface UserType {
  admin: boolean;
  appointments?: Object[];
  employee: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  services: Object[];
  store?: Object;
  storeOwner: boolean;
  username: string;
}
