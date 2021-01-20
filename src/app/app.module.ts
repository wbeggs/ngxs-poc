import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxsModule } from '@ngxs/store';
import { CustomerState } from '../state/customer-state/customer-state';
import { AppState } from '../state/app-state';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { OrderState } from '../state/order-state/order-state';

const ROUTES = [
  {
    path: 'dashboard',
    pathmatch: 'full',
    component: DashboardComponent,
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([AppState, CustomerState, OrderState],
      {
        selectorOptions: {
          injectContainerState: false // Don't inject the entire state by default into selectors
        }
      }
      ),
    RouterModule.forRoot(ROUTES),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
