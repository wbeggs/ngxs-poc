import { Injectable } from '@angular/core';
import { ExternalApiService } from '../../services/external-api-service';
import { Store } from '@ngxs/store';
import * as customerActions from './customer-actions';
import { CustomerFeeling, ICustomerBasicInfo, ICustomerEmotionalState, ICustomerState, CustomerMaritalStatus } from './customer-models';
import { IThirdPartyCustomer } from '../../services/external-api-models';
import { getCookieInfo } from '../../app/utils/cookie-utils';

@Injectable({
  providedIn: 'root',
})
export class CustomerStateService {
  // What goes inside of a state service?
  // -Root state service (not children) may handle calls to back end api that affect multiple slices of state and
  //  then call the appropriate methods on individual state services to perform logic or mapping and pushing processed data into state slice
  // -Anything that retrieves external data/browser data for state and then pushes it into an action
  // -Logic and mappings for pushing things into state
  // -Anything needed to call an action that comes from an injected service or util
  // -Do not inject state services into other state services with the exception of the root state service (so it can handle external calls
  //  that retrieve data that goes into multiple slices of state such as startup data)

  constructor(public extApiService: ExternalApiService, private _store: Store ) {}

  // Actions -> This service acts as a gatekeeper to actions and can handle any logic needed before actually calling the underlying store
  // actions. Because we have this layer, it makes sense to keep external data calls here as well.
  // Note: This could just as easily been a set function that updates an external data store and then either updates the store with the
  // result, or else makes another call to get the refreshed state if the first call does not return the total updated state.
  public async loadCustomer(customerId: string): Promise<void> {
    // Pretend we are gate keeping this guy somehow
    if (+customerId > 15) {
      console.log('This person is trying to access secret records.');
      customerId = null;
    }
    let customer = await this.extApiService.getCustomerDataFromPretendThirdParty(customerId).toPromise();
    this.mapAndSetCustomer(customer);
  }

  public async updateMarriageState(status: CustomerMaritalStatus): Promise<void> {
    let feeling = status === CustomerMaritalStatus.Married ? CustomerFeeling.Happy : CustomerFeeling.Sad;
    this._store.dispatch(new customerActions.HandleMarriageEvent(status, feeling));
  }

  public async updateFeeling(feeling: CustomerFeeling): Promise<void> {
    this._store.dispatch(new customerActions.SetEmotionalState({feeling}));
  }

  public mapAndSetCustomer(customer: IThirdPartyCustomer): void {
    // Perform some mapping to match store contract
    let mappedCustomer = this.mapThirdPartyCustomerToCustomer(customer);
    mappedCustomer.trackingId = this.getCookieInfo().trackingId;
    this._store.dispatch(new customerActions.SetCustomer(mappedCustomer));
  }

  // handle mapping of external api object to store object
  private mapThirdPartyCustomerToCustomer(customer: IThirdPartyCustomer): ICustomerState {
    let basicInfo = this.mapThirdPartyCustomerToBasicCustomerInfo(customer);
    let maritalStatus = CustomerMaritalStatus[customer.maritalStatus];
    let emotionalState = this.mapThirdPartyCustomerToEmotionalState(customer);
    return {
      id: customer.id,
      customerQuestions: 0,
      basicInfo,
      maritalStatus,
      emotionalState,
    } as ICustomerState;
  }

  // map smaller slices of store that may be updated individually
  private mapThirdPartyCustomerToBasicCustomerInfo(customer: IThirdPartyCustomer): ICustomerBasicInfo {
    return {
      lastName: customer.lastName,
      firstName: customer.firstName,
      age: customer.age,
    } as ICustomerBasicInfo;
  }

  private mapThirdPartyCustomerToEmotionalState(customer: IThirdPartyCustomer): ICustomerEmotionalState {
    let feeling: CustomerFeeling = CustomerFeeling[customer.feeling];
    return {
      feeling
    } as ICustomerEmotionalState;
  }

  private getCookieInfo(): any {
    return getCookieInfo('cookieName');
  }
}
