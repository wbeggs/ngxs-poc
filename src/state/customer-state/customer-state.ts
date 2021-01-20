import { ICustomerBasicInfo, ICustomerEmotionalState, ICustomerState, CustomerMaritalStatus } from './customer-models';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import * as customerActions from './customer-actions';

const CUSTOMER_STATE_DEFAULT: ICustomerState = {
  id: undefined,
  basicInfo: undefined,
  customerQuestions: 0,
  maritalStatus: CustomerMaritalStatus.Unknown,
  emotionalState: undefined,
  trackingId: '',
};

export const CUSTOMER_STATE_TOKEN = new StateToken<ICustomerState>('customerState');

@State<ICustomerState>({
  name: CUSTOMER_STATE_TOKEN,
  defaults: CUSTOMER_STATE_DEFAULT
})
@Injectable()
export class CustomerState {
  // What goes into a state slice?
  // -Actions that push data into the store
  // -Actions that break down into other action (I.E. a large chunk of state data that has smaller pieces that are sometimes
  //  retrieved individually, but other times retrieved together)
  // -Actions that calculate store data that cannot be derived from other pieces of state at any given time and are not from an
  //  external data source (i.e. an incrementer)
  // -Selectors for data points that are derived from other pieces of state (computed properties)
  // -Never push data into the store that can be derived from other properties in the store. This creates multiple sources of truth. Use
  //  selectors for that purpose.
  // -Avoid actions that set a static state (I.E. having a marriage and divorce action that set static values instead of having a dynamic
  //  action that sets the marriage state and emotional state

  // Selectors

  @Selector()
  static basicInfo(state: ICustomerState): ICustomerBasicInfo {
    return state.basicInfo;
  }

  // A memoized selector
  @Selector([CustomerState.basicInfo])
  static fullName(basicInfo: ICustomerBasicInfo): string {
    return `${basicInfo?.firstName} ${basicInfo?.lastName}`;
  }

  // Actions
  @Action(customerActions.SetCustomer)
  setCustomer(state: StateContext<ICustomerState>, { customer }: customerActions.SetCustomer): void {
    state.setState( customer );
  }

  @Action(customerActions.SetBasicInfo)
  setBasicInfo(state: StateContext<ICustomerState>, { basicInfo }: customerActions.SetBasicInfo): void {
    state.patchState({ basicInfo });
  }

  // We don't want to be adding actions that update only one property and chain them all together, but I wanted to show an example of
  // how a larger action could filter into smaller ones.
  @Action(customerActions.SetMaritalStatus)
  setMaritalStatus(state: StateContext<ICustomerState>, { maritalStatus }: customerActions.SetMaritalStatus): void {
    state.patchState({ maritalStatus });
  }

  @Action(customerActions.SetEmotionalState)
  setCustomerLastName(state: StateContext<ICustomerState>, { emotionalState }: customerActions.SetEmotionalState): void {
    state.patchState({emotionalState});
  }

  // Example of calling multiple actions from one action where each action may get called separately in other places
  // TODO: see if there is a better way to patch state more than one deep...
  @Action(customerActions.HandleMarriageEvent)
  marryCustomer(state: StateContext<ICustomerState>, { maritalStatus, feeling }: customerActions.HandleMarriageEvent): void {
    state.dispatch(new customerActions.SetMaritalStatus(maritalStatus));
    let emotionalState = state.getState().emotionalState ?? {} as ICustomerEmotionalState;
    emotionalState.feeling = feeling;
    state.dispatch(new customerActions.SetEmotionalState(emotionalState));
  }

  @Action(customerActions.IncrementQuestions)
  incrementCustomerAge(state: StateContext<ICustomerState>): void {
    let newState = state.getState().customerQuestions++;
    state.patchState({customerQuestions: newState});
  }
}
