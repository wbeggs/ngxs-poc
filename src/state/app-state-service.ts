import { Injectable } from '@angular/core';
import { ExternalApiService } from '../services/external-api-service';
import { CustomerStateService } from './customer-state/customer-state-service';
import { OrderStateService } from './order-state/order-state-service';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {

  constructor(public externalApiService: ExternalApiService,
              public customerStateService: CustomerStateService,
              public orderStateService: OrderStateService) {}

  public async loadDashboard(customerId: string): Promise<void> {
    let dashboard = await this.externalApiService.getDashboard(customerId).toPromise();
    // I don't want to duplicate mappings, so I am injecting the state services instead of pushing directly to state. The state services
    // still have api calls because the ui portion shouldn't have to know the data sources ever. They just listen and tell it when to load.
    // It's possible to have the mappings as utils so that this service can dispatch directly to state, and then have logic that takes place
    // after mapping in the state slices, and that which takes place before in the state slice services, but that seems too muddy.
    this.customerStateService.mapAndSetCustomer(dashboard.customer);
    this.orderStateService.mapAndSetOrders(dashboard.orders);
  }
}

