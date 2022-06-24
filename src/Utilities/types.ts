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
  email?: string;
  store?: ReturnStoreType;
  appointments?: StylistAppointmentType[];
  services?: ServiceType[];
  picture?: Buffer;
  owner?: boolean;
  admin?: boolean;
  employee?: boolean;
  ownedStores?: ReturnStoreType[];
  _id: string;
}

export interface BackendResponseDataType {
  success: boolean;
  token: string;
  user?: ReturnUserType;
}

export interface MessageType {
  message: string;
  warning: boolean;
}

export interface ModalCloseProp {
  closeModal(): void;
}

export interface StoreDayHour {
  open: string;
  close: string;
  closed: boolean;
  _id?: string;
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
  appointments?: StylistAppointmentType[];
  services: ServiceType[];
  picture?: string;
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
  picture?: Buffer | string;
}

export interface ReservationType {
  slotDateTime: Date | null;
  comments: string;
  service: string;
}

export interface NewAppointmentType {
  slotDateTime: Date | null;
  comments: string;
  service: string;
  customer: string;
}

export interface ScheduleDateType {
  time: Date;
  available?: boolean;
  applicable?: boolean;
  closed?: boolean;
  appointmentId?: string;
  id?: number;
  possibleHead?: boolean;
  chosen?: boolean;
  editAppointmentBlock?: boolean;
}

export interface ScheduleArrayType {
  hour: string;
  slots: ScheduleDateType[];
}

export interface timeSlotType {
  appointment: string;
  createdAt: Date;
  employee: string;
  owner: string;
  slotDateTime: Date;
}

export interface StylistAppointmentType {
  employee: ReturnUserType;
  owner: ReturnUserType;
  service: ServiceType;
  timeSlots: timeSlotType[];
  _id: string;
  comments: string;
}

export interface CreateStoreType {
  storeName: string;
  storeType: string;
  storeDescription: string;
  storeWebsite: string;
  location: string;
  locationLink: string;
  phoneNumber: string;
  hours: StoreDayHour[];
}

export interface EditStoreType {
  storeName?: string;
  storeType?: string;
  storeDescription?: string;
  storeWebsite?: string;
  location?: string;
  locationLink?: string;
  phoneNumber?: string;
  hours?: StoreDayHour[];
}
