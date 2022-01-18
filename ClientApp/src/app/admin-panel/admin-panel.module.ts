import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PurchaseComponent } from './purchase/purchase.component';
import { SubscriptionsComponent } from './subscription-type/subscriptions-type.component';
import { TicketsComponent } from './tickets/tickets.component';
// import { LogsComponent } from './logs/logs.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../shared/shared.module';
import { ApQuotationComponent } from './ap-quotation/ap-quotation.component';
import { ApContactComponent } from './ap-contact/ap-contact.component';
import { ApOrderComponent } from './ap-order/ap-order.component';
import { BillingHistoryComponent } from '../features/billing-history/billing-history.component';

const routes = [
  {
    path: 'purchase',
    component: PurchaseComponent,
    data: { breadcrumb: 'purchase-management' },
  },
  //{ path: 'logs', component:LogsComponent, data: { breadcrumb: 'logs' } },
  {
    path: 'subscription',
    component: SubscriptionsComponent,
    data: { breadcrumb: 'logs' },
  },
  { path: 'billing-history', component: BillingHistoryComponent },
];

@NgModule({
  declarations: [
    PurchaseComponent,
    SubscriptionsComponent,
    TicketsComponent,
    // LogsComponent,
    ApOrderComponent,
    ApQuotationComponent,
    ApContactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AdminPanelModule {}
