export interface IOrderState
{
  orders: IOrder[];
}

export interface IOrder {
  id: string;
  description: string;
  status: OrderStatus;
}

export enum OrderStatus {
  Unknown = 0,
  NotShipped = 1,
  Shipped = 2,
  Delivered = 3,
}
