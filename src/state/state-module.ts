import { NgModule } from '@angular/core';
import {CustomerStateService} from './customer-state/customer-state-service';
import { OrderStateService } from './order-state/order-state-service';

@NgModule({
  exports: [],
  declarations: [],
  imports: [],
  providers: [CustomerStateService, OrderStateService]
})
export class StateModule {}
