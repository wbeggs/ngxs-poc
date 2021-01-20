import { Injectable } from '@angular/core';
import { IThirdPartyCustomer, IThirdPartyDashboard, IThirdPartyOrder } from './external-api-models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExternalApiService {
  constructor() {}

  // pretend we went somewhere external...
  public getCustomerDataFromPretendThirdParty(id: string): Observable<IThirdPartyCustomer> {
    return of<IThirdPartyCustomer>(this.getCustomer(id));
  }

  // pretend this is one call to an api that gets a complex object
  public getDashboard(id: string): Observable<IThirdPartyDashboard> {
    return of<IThirdPartyDashboard> ({
      customer: this.getCustomer(id),
      orders: this.getOrders(id)
    });
  }

  // Just some dummy data
  private getOrders(id: string): IThirdPartyOrder[] {
    switch (id) {
      case '1':
        return [
          {
            id: '1234',
            description: 'Some chalk',
            address: '123 W street',
            status: 'Shipped'
          },
          {
            id: '1224',
            description: 'Turkeys',
            address: '123 W lane',
            status: 'Delivered'
          }
        ];
        break;
      case '2':
        return [
          {
            id: '665',
            description: 'Elf trimmings',
            address: '56 S Main',
            status: 'Shipped'
          },
          {
            id: '798',
            description: 'Hands',
            address: '123 W lane',
            status: 'Delivered'
          }
        ];
        break;
      default:
        return [];
    }
  }

  private getCustomer(id: string): IThirdPartyCustomer {
    switch (id) {
      case '1':
        return {
          firstName: 'Stanley',
          lastName: 'Hudson',
          id: '1',
          ideology: 'laissez faire',
          age: 60,
          maritalStatus: 'Married',
          feeling: 'Disgruntled'
        } as IThirdPartyCustomer;
        break;
      case '2':
        return {
          firstName: 'Stanley',
          lastName: 'Spadowski',
          id: '2',
          ideology: 'mops',
          age: 54,
          maritalStatus: 'Single',
          feeling: 'Happy'
        } as IThirdPartyCustomer;
        break;
      default:
        return {} as any;
    }
  }
}
