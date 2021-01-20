import { CustomerFeeling, ICustomerBasicInfo, ICustomerEmotionalState, ICustomerState, CustomerMaritalStatus } from './customer-models';

export class SetCustomer {
  static readonly type = '[Customer] set customer state';
  constructor(public customer: ICustomerState) {}
}

export class SetBasicInfo {
  static readonly type = '[Customer] set basic info';
  constructor(public basicInfo: ICustomerBasicInfo) {}
}

export class IncrementQuestions {
  static readonly type = '[Customer] increment questions';
}

export class SetEmotionalState {
  static readonly type = '[Customer] set emotional state';
  constructor(public emotionalState: ICustomerEmotionalState) {}
}

export class SetMaritalStatus {
  static readonly type = '[Customer] set marital status';
  constructor(public maritalStatus: CustomerMaritalStatus) {}
}

export class HandleMarriageEvent {
  static readonly type = '[Customer] handleMarriageEvent';
  constructor(public maritalStatus: CustomerMaritalStatus, public feeling: CustomerFeeling) {}
}
