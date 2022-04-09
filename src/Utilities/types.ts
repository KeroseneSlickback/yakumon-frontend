export interface UserRegisterType {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserLoginType {
  username: string;
  password: string;
}

export interface ServiceType {
  _id: string;
  serviceName: string;
  timeSpan: number;
  price: number;
  owner: string;
}

// Make appointment type

export interface ReturnUserType {
  firstName: string;
  lastName: string;
  title?: string;
  username: string;
  phoneNumber: string;
  email: string;
  store?: ReturnStoreType;
  appointments?: Object[];
  services?: ServiceType[];
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

export interface StoreDayHour {
  day: string;
  open: string;
  close: string;
  _id: string;
}

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  title: string;
  username: string;
  phoneNumber: string;
  email?: string;
  store?: ReturnStoreType;
  appointments?: Object[];
  services: ServiceType[];
  picture: string;
  storeOwner: boolean;
  admin: boolean;
  employee: boolean;
}

export interface ReturnStoreType {
  _id: string;
  storeName: string;
  storeType: string;
  storeDescription: string;
  storeWebsite?: string;
  phoneNumber?: string;
  location: string;
  locationLink: string;
  hours: StoreDayHour[];
  employees: UserType[];
  owners: UserType[];
  __V: number;
  picture: string;
}

export interface ReservationType {
  employee: string;
  customer: string;
  slotDateTime: Date | null;
  createdAt: Date | null;
  comments: string;
  service: string;
}

export interface SchedulePropTypes {
  appointments?: Object[];
  services?: ServiceType[];
  selectedService?: string;
  store?: ReturnStoreType;
}

// Build an Appointment type
