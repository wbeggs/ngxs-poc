export interface ICustomerState {
  id: string;
  basicInfo: ICustomerBasicInfo;
  customerQuestions: number;
  maritalStatus: CustomerMaritalStatus;
  emotionalState: ICustomerEmotionalState;
  trackingId: string;
}

export interface ICustomerBasicInfo {
  firstName: string;
  lastName: string;
  age: number;
}

export interface ICustomerEmotionalState {
  feeling: CustomerFeeling;
}

export enum CustomerMaritalStatus {
  Unknown = 0,
  Single = 1,
  Married = 2,
  Other = 3
}

export enum CustomerFeeling {
  Unknown = 0,
  Happy = 1,
  Sad = 2,
  Disgruntled = 3
}
