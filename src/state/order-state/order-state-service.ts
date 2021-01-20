import { Injectable } from '@angular/core';
import { IThirdPartyOrder } from '../../services/external-api-models';
import { Store } from '@ngxs/store';
import * as orderActions from './order-actions';
import { IOrder, OrderStatus } from './order-models';

@Injectable({
  providedIn: 'root',
})
export class OrderStateService {
  constructor(private _store: Store) {}

  public mapAndSetOrders(orders: IThirdPartyOrder[]): void {
    let mappedOrders = orders.map(this.mapThirdPartyOrder);
    this._store.dispatch(new orderActions.SetOrders(mappedOrders));
  }

  private mapThirdPartyOrder(order: IThirdPartyOrder): IOrder
  {
    return {
      id: order.id,
      description: order.description,
      status: OrderStatus[order.status]
    } as IOrder;
  }
}
