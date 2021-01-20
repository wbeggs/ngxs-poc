import {State, StateToken} from '@ngxs/store';
import {CustomerState} from './customer-state/customer-state';
import {Injectable} from '@angular/core';
import { OrderState } from './order-state/order-state';

export interface IAppState {
  prop1: string;
}

const APP_STATE_DEFAULT: IAppState = {
  prop1: undefined
};

export const APP_STATE_TOKEN = new StateToken<IAppState>('appState');

@State<IAppState>({
  name: APP_STATE_TOKEN,
  defaults: APP_STATE_DEFAULT,
  children: [CustomerState, OrderState]
})
@Injectable()
export class AppState {}
