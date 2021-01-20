import { Component, OnInit } from '@angular/core';
import { CustomerStateService } from '../../state/customer-state/customer-state-service';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { CustomerFeeling, ICustomerBasicInfo, ICustomerEmotionalState, ICustomerState, CustomerMaritalStatus } from '../../state/customer-state/customer-models';
import { CustomerState } from '../../state/customer-state/customer-state';
import { AppStateService } from '../../state/app-state-service';
import { IOrder, IOrderState, OrderStatus } from '../../state/order-state/order-models';
import { OrderState } from '../../state/order-state/order-state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public MaritalStatus = CustomerMaritalStatus; // Import the enum
  public OrderStatus = OrderStatus; // Import the enum
  public Feeling = CustomerFeeling;
  public custId = '';
  public basicInfo: ICustomerBasicInfo;
  @Select(s => s.appState.customerState.emotionalState)
  public emotionalState$: Observable<ICustomerEmotionalState>;
  @Select(CustomerState.fullName) // Subscribe to a computed property
  public fullName$: Observable<string>;
  @Select(s => s.appState.customerState.basicInfo.age)
  public age$: Observable<number>;
  @Select(s => s.appState.customerState.maritalStatus)
  public maritalStatus$: Observable<CustomerMaritalStatus>;
  @Select(OrderState.totalOrders) // Subscribe to a computed property
  public totalOrders$: Observable<number>;
  @Select(s => s.appState.customerState.trackingId)
  public trackingId$: Observable<string>;
  public orders: IOrder[];

  @Select(s => s.appState.customerState)
  public customerState$: Observable<ICustomerState>;
  @Select(s => s.appState.orderState)
  public orderState$: Observable<IOrderState>;

  constructor(public customerStateService: CustomerStateService,
              public appStateService: AppStateService) { }

  ngOnInit(): void {
    // The store won't fire unless I have subscriptions. Not sure why.
    this.customerState$.subscribe(c => this.basicInfo = c.basicInfo);
    this.orderState$.subscribe(o => this.orders = o.orders);
  }

  public async loadDashboard(): Promise<void> {
    await this.appStateService.loadDashboard(this.custId);
  }

  public async loadCustomer(): Promise<void> {
    await this.customerStateService.loadCustomer(this.custId);
  }

  public async marryCustomer(): Promise<void> {
    await this.customerStateService.updateMarriageState(CustomerMaritalStatus.Married);
  }

  public async divorceCustomer(): Promise<void> {
    await this.customerStateService.updateMarriageState(CustomerMaritalStatus.Single);
  }

  public async makeCustomerSad(): Promise<void> {
    await this.customerStateService.updateFeeling(CustomerFeeling.Sad);
  }

  public async disgruntleCustomer(): Promise<void> {
    await this.customerStateService.updateFeeling(CustomerFeeling.Disgruntled);
  }
}
