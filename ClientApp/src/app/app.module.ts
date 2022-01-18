import { environment } from '../environments/environment';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FaqComponent } from './features/faq/faq.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { BillingHistoryComponent } from './features/billing-history/billing-history.component';
import { QuoteHistoryComponent } from './features/quote-history/quote-history.component';
import { TableModule } from 'primeng/table';
import { CpLiscenseComponent } from './customer-panel/cp-license/cp-license.component';
import { CpQuotationComponent } from './customer-panel/cp-quotation/cp-quotation.component';
import { CustomerService } from './customerService';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from './shared/shared.module';
import { CpLicenseMachineComponent } from './customer-panel/cp-license-machine/cp-license-machine.component';

import { LayoutComponent } from './shared/layout/layout.component';
import { JwtInterceptor } from './shared/core/JwtInterceptor';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { LicenseGeneratedComponent } from './payment/license-generated/license-generated.component';
//import { RazorpayCheckoutComponent } from './payment/razorpay-checkout/razorpay-checkout.component';
import { WindowRefService } from './services/window-ref.service';
import { PaymentCancelComponent } from './payment/payment-cancel/payment-cancel.component';
import { CreateTempUserComponent } from './payment/create-temp-user/create-temp-user.component';

import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { AccountComponent } from './account/account.component';
import { AccountActivateComponent } from './account/account-activate/account-activate.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './contact/feedback/feedback.component';
import { PricingComponent } from './pricing/pricing.component';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { PrivacyPolicyComponent } from './policy/privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './policy/cookie-policy/cookie-policy.component';
import { TermsAndCondComponent } from './policy/terms-and-cond/terms-and-cond.component';
import { QuotationCheckoutComponent } from './payment/quotation-checkout/quotation-checkout.component';
import { DownloadComponent } from './download/download.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieConsentBannerComponent } from './cookie-consent-banner/cookie-consent-banner.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    FaqComponent,
    ContactComponent,
    LoginComponent,
    CpLiscenseComponent,
    CpLicenseMachineComponent,
    CpQuotationComponent,
    BillingHistoryComponent,
    QuoteHistoryComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    CheckoutComponent,
    LicenseGeneratedComponent,
    //RazorpayCheckoutComponent,
    PaymentCancelComponent,
    CreateTempUserComponent,
    AccountComponent,
    AccountActivateComponent,
    ChangePasswordComponent,
    FeedbackComponent,
    PricingComponent,
    PrivacyPolicyComponent,
    CookiePolicyComponent,
    TermsAndCondComponent,
    QuotationCheckoutComponent,
    DownloadComponent,
    CookieConsentBannerComponent
  ],
  imports: [
    RecaptchaModule,
    RecaptchaFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RatingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    MenubarModule,
    SharedModule,
    TooltipModule,
    DropdownModule,
    AccordionModule,
    InputTextModule,
    NgbModule

  ],
  providers: [
    CustomerService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    WindowRefService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
