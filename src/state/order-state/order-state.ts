import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { IOrder, IOrderState } from './order-models';
import { Injectable } from '@angular/core';
import * as orderActions from './order-actions';

const ORDER_STATE_DEFAULT = {
  orders: undefined,
};

export const ORDER_STATE_TOKEN  = new StateToken<IOrderState>('orderState');

@State<IOrderState>({
  name: ORDER_STATE_TOKEN,
  defaults: ORDER_STATE_DEFAULT
})
@Injectable()
export class OrderState {

  // This selector helps with performance by allowing other selectors to listen only to changes in one slice of state
  @Selector()
  static orders(state: IOrderState): IOrder[] {
    return state.orders;
  }

  // This selector listens to the slice emitted by the orders selector and only fires when state.orders changes
  @Selector([OrderState.orders])
  static totalOrders(orders: IOrderState[]): number {
    return orders?.length;
  }

  @Action(orderActions.SetOrders)
  setOrders(state: StateContext<IOrderState>, {orders}: orderActions.SetOrders): void {
    state.setState({orders});
  }
}

