import { ManageCodeRepositoryComponent } from './home/manage-code-repository/manage-code-repository.component';
import { CustomizeCodingStandardComponent } from './home/customize-coding-standard/customize-coding-standard.component';
import { ExpressionViewerComponent } from './home/expression-viewer/expression-viewer.component';
import { CodeSearchComponent } from './home/code-search/code-search.component';
import { CodeRepositoryComponent } from './home/code-repository/code-repository.component';
import { CodeTreeViewComponent } from './home/code-tree-view/code-tree-view.component';
import { CodeReviewComponent } from './home/code-review/code-review.component';
import { XatocodeComponent } from './home/xatocode/xatocode.component';
import { DownloadComponent } from './download/download.component';
import { CookiePolicyComponent } from './policy/cookie-policy/cookie-policy.component';
import { PrivacyPolicyComponent } from './policy/privacy-policy/privacy-policy.component';
import { TermsAndCondComponent } from './policy/terms-and-cond/terms-and-cond.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpLiscenseComponent } from './customer-panel/cp-license/cp-license.component';
import { CpLicenseMachineComponent } from './customer-panel/cp-license-machine/cp-license-machine.component';
import { CpQuotationComponent } from './customer-panel/cp-quotation/cp-quotation.component';
import { ApQuotationComponent } from './admin-panel/ap-quotation/ap-quotation.component';
import { BillingHistoryComponent } from './features/billing-history/billing-history.component';
import { FaqComponent } from './features/faq/faq.component';
import { QuoteHistoryComponent } from './features/quote-history/quote-history.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './shared/core/auth.guard';

import { LicenseGeneratedComponent } from './payment/license-generated/license-generated.component';
//import { RazorpayCheckoutComponent } from './payment/razorpay-checkout/razorpay-checkout.component';
import { PaymentCancelComponent } from './payment/payment-cancel/payment-cancel.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { CreateTempUserComponent } from './payment/create-temp-user/create-temp-user.component';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { AccountActivateComponent } from './account/account-activate/account-activate.component';
import { RegisterComponent } from './account/register/register.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { LoginComponent } from './account/login/login.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { ContactComponent } from './contact/contact.component';
import { ApContactComponent } from './admin-panel/ap-contact/ap-contact.component';
import { ApOrderComponent } from './admin-panel/ap-order/ap-order.component';
import { FeedbackComponent } from './contact/feedback/feedback.component';
import { PricingComponent } from './pricing/pricing.component';
import { QuotationCheckoutComponent } from './payment/quotation-checkout/quotation-checkout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'create-temp-user', component: CreateTempUserComponent },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'quotation-checkout',
        component: QuotationCheckoutComponent
      },
      //{ path: 'razorpay-checkout/:type', component: RazorpayCheckoutComponent, data: { breadcrumb: 'razor-pay' } },
      { path: 'license-generated/:id', component: LicenseGeneratedComponent },
      { path: 'payment-cancelled', component: PaymentCancelComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'download', component: DownloadComponent },
      { path: 'admin-panel/contact', component: ApContactComponent, canActivate: [AuthGuard] },
      { path: 'contact', component: ContactComponent },
      { path: 'term-condition', component: TermsAndCondComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'cookie-policy', component: CookiePolicyComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'contact/feedback/:id/:key', component: FeedbackComponent },
      { path: 'my-license', component: CpLiscenseComponent },
      { path: 'my-license-machine/:id', component: CpLicenseMachineComponent },
      { path: 'quotation', component: CpQuotationComponent },
      { path: 'billing-history', component: BillingHistoryComponent },
      { path: 'quote-history', component: QuoteHistoryComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'admin-panel/order', component: ApOrderComponent, canActivate: [AuthGuard] },
      { path: 'admin-panel/quotation', component: ApQuotationComponent, canActivate: [AuthGuard]},
      { path: 'account/activate/:id', component: AccountActivateComponent },

      {
        path: 'admin-panel',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./admin-panel/admin-panel.module').then(
            (m) => m.AdminPanelModule
          ),
        data: { breadcrumb: 'admin' },
      },
      {
        path: 'master',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./master-data/master-data.module').then(
            (m) => m.MasterDataModule
          ),
        data: { breadcrumb: 'master' },
      },
      { path: 'login', component: LoginComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { 
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
