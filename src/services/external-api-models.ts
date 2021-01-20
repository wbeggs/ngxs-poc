export interface IThirdPartyDashboard {
  customer: IThirdPartyCustomer;
  orders: IThirdPartyOrder[];
}

export interface IThirdPartyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  ideology: string;
  age: number;
  maritalStatus: string;
  feeling: string;
}

export interface IThirdPartyOrder {
  id: string;
  description: string;
  status: string;
  address: string;
}
