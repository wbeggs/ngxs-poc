import { IOrder } from './order-models';

export class SetOrders {
  static readonly type = '[Orders] set orders';
  constructor(public orders: IOrder[]) {}
}
