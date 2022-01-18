import { CheckoutService } from './../../services/checkout.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/account/service/user.service';
import { CountryService } from 'src/app/master-data/services/country.service';
import { ProductSubscriptionTypeService } from 'src/app/master-data/services/product-subscription-type.service';
import { SubscriptionTypeService } from 'src/app/master-data/services/subscription-type.service ';
import { QuotationCheckoutService } from 'src/app/services/quotation-checkout.service';
import { FormValidatorService } from 'src/app/services/Util/form-validator.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { AuthService } from 'src/app/shared/core/auth.service';
import { environment } from 'src/environments/environment.prod';

interface ICalculatedQuotationDetail{
  quotationId:number,
  quotationDiscountPercent:number,
  total1USD:number,
  productSubscriptionTypeId:number,
  productName:string,
  phone:string,
  iso2Code:string,
  addressLine1:string,
  addressLine2:string,
  city:string,
  localCurrencyCode:string,
  localToUSDMuiltiplier:number,
  postCode:number,
  priceUSD:number,
  quantity:number,
  gstPercent:number,
  gstValue:number,
  totalDiscount:number,
  grandTotalUSD:number
}

@Component({
  selector: 'app-quotation-checkout',
  templateUrl: './quotation-checkout.component.html',
  styleUrls: ['./quotation-checkout.component.scss']
})
export class QuotationCheckoutComponent implements OnInit {
  @ViewChild('noteForm', { static: true })

  calculatedQuotationDetails:ICalculatedQuotationDetail;
  noteForm!: NgForm;
  public form: FormGroup;
  public emailForm: FormGroup;
  public totalPrice = 0;
  public grandTotal = 0;
  public productSubId=0;
  email:any="";
  loading = false;
  id:number = 0;
  isoCode:string = '';
  isLoggedIn = true;
  isEmailAlreadyExist = false;
  showOrderDetailForm = false;
  passwordMatch = false;
  tokenStorage: any = "";
  subscriptionData: any = [];
  productSubscriptionTypeData: any = [];
  country:any = [];
  PackagePeriod:any = [];
  selecedPackagePeriod: any = "";
  packagePeriod: any = "";
  CouponCode: any = "";
  quantity: number = 1;
  orderDetail: any = {
    country: null, couponCode: null, couponDiscountId: null, couponDiscountPercent: null, customerName: null, grandTotalUSD: null, gstPercent: null,
    gstValue: null, phone: null, addressLine1: null, addressLine2: null, city: null, postCode: null, priceUSD: null, productName: null,
    productSubscriptionTypeId: null,quantity: null, specialDiscountId: null,specialDiscountPercent: null, total1USD: null, total2USD: null, totalDiscount: null
  };
  monthYear: any = "";
  showEmail = "";
  iso2CountryCode: any;
  isIndian:boolean;


  constructor(
    private checkoutService: QuotationCheckoutService,
    private baseCheckoutService: CheckoutService,
    public fb: FormBuilder,
    public um: UserService,
    private activeRoute: ActivatedRoute,
    public router: Router,
    private subscription: SubscriptionTypeService,
    private prodSubService: ProductSubscriptionTypeService,
    public countryService: CountryService,
    private authService:AuthService,
    private winRef: WindowRefService,
    private formValidator: FormValidatorService,
    private messageService: MessageService
  ) {

    this.emailForm = this.fb.group({
      Email: [null]
    })
    this.form = this.fb.group({
      CustomerName: [null, Validators.required],
      AddressLine1: [null, Validators.required],
      AddressLine2: [null],
      City: [null, Validators.required],
      PostalCode: ['asdas', [Validators.maxLength(10)]],
      Country: [null],
      Phone: ['88888', Validators.required]
    });
   
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.id = params['id'] as number;
      this.isoCode = params['isoCode'] as string;
      this.getCalculatedQuotationDetail(this.id, this.isoCode);
    });
    this.getProductSubscriptionType();
    this.getallcountries();
    this.isUserLoggedIn();
  }

  getCalculatedQuotationDetail(id:number, isoCode:string){
    this.checkoutService.getSavedQuotationCalculation(id, isoCode).subscribe((result:ICalculatedQuotationDetail) => {
      this.calculatedQuotationDetails = result;
      this.form.controls['Country'].patchValue(this.calculatedQuotationDetails.iso2Code);
      this.calculatedQuotationDetails.iso2Code === 'IN'?this.isIndian = true:this.isIndian = false;
    });
  }

  getProductSubscriptionType() {
    this.prodSubService.GetAll().subscribe((res: any) => {
      //debugger
      this.PackagePeriod = res;
      this.selecedPackagePeriod = res[0].subscriptionTypeId;
      console.log(res);
    }, err => {

    })
  }
  get f() { return this.form.controls; }
  isUserLoggedIn(){
    var token = this.authService.getToken();
    if( token!=null && token != ""){
          this.isLoggedIn =true;
        }
    else {
      debugger
          this.isLoggedIn=false;
          this.router.navigate(['/login'])
        }
  }
 
  getallcountries() {
    this.countryService.getAll().subscribe(
      (resp: any) => {
        this.country = resp;
        this.iso2CountryCode = 0;
        //this.form.patchValue(this.country.filter((x:any) => x.iso2Code=='IN')[0]);
        console.log(resp);
      },
      err => {
        console.log(err);
      }
    );
  }

  getProdSubTypeById(subId:any) {
    debugger
    this.prodSubService.getProductSubscriptionById(subId).subscribe((res: any) => {
      this.productSubscriptionTypeData = res;
      debugger
      this.productSubId = res.productSubscriptionTypeId
      this.quantity = 1;
      this.calculatePrice(true);
      console.log(res);
    }, err => {

    })
  }
  submit() {
    
    
  }
  isEmailExist() {
    debugger
    this.isLoggedIn=true;
    this.form.patchValue({Email:this.email})
  }
  changeEmail(event:any) {
    this.showEmail = this.emailForm.controls["Email"].value;
  }
  checkPassword() {
    if (this.form.valid) {
      this.loading = true;
      this.um.login(this.form.value.email, this.form.value.password).subscribe(
        (res: any) => {
          if (res == null) {
            this.loading = false;
            this.passwordMatch = false;
          }
          else if (res.email.length > 0) {
            this.tokenStorage = res.jwtToken;
            this.loading = false;
            localStorage.setItem('token', this.tokenStorage);
            this.passwordMatch = true;
          } else {
            this.loading = false;
            this.passwordMatch = false;
          }
        },
        err => {
          
          console.log(err);
          this.passwordMatch = false;
          this.loading = false;
        }
      );
    }
  }
  calculatePrice(firstTime:any) {
    alert(firstTime);
    
  }
  createOrder(form: any) {
    if (this.form.valid) {
      if(this.calculatedQuotationDetails.iso2Code !='IN'){
        this.checkoutService.CreatePaypalOrder(this.form.value, this.calculatedQuotationDetails).subscribe((res: any) => {
          window.open(res.paymentUrl, "_self")
        }, err => {
         console.log(err)
        });
    }else{
      this.createRazorpayOrder(this.form);
    }
     
    }else{
      alert("form error");
      this.formValidator.validateAllFormFields(this.form);
    } 
  }
  
  createRazorpayOrder(form:any) {
    if (this.form.valid) {
      this.checkoutService.CreateRazorpayOrder(this.form.value, this.calculatedQuotationDetails).subscribe((razorPayRes: any) => {
        this.payWithRazor(razorPayRes);
        setTimeout(() => {
          // TODO Display an error message
        }, 3000);
      }, (err: any) => {
        this.messageService.add({
          severity: "error",
          summary: "error",
          detail: "Mandatory fields missing",
          life: 3000,
        });
      });
    } else {
      alert("hi");
      this.formValidator.validateAllFormFields(this.form);
    }
  }

  payWithRazor(razorpayCallbackResponse: any) {
    
    debugger
    const options: any = {
      "key": "rzp_test_NjdJa4iNkY3Pn3", // Enter the Key ID generated from the Dashboard
      "amount": razorpayCallbackResponse.amountINR, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id":  razorpayCallbackResponse.invoiceId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler":  (response:any) => {
        var result  =  this.baseCheckoutService.updateRazorpayCheckout(response.razorpay_payment_id,
          response.razorpay_order_id,response.razorpay_signature );
        
        result.subscribe((resp: any) => {
          //this.invokeLicenseGeneratedCallback(res.LicenseCrypt);
          window.open(environment.WebURI+'license-generated/' + resp.license ,"_self");
        }, (err: any) => {
          console.log(err);
          // TODO redirect to error page
          //this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error, life: 3000 });
        });
        //window.open(environment.BaseURI+'RazorpayCheckout/RazorpayPaymentCallback?razorpay_payment_id='
        // + response.razorpay_payment_id + "&razorpay_order_id=" + response.razorpay_order_id + 
         //"&razorpay_signature=" + response.razorpay_signature, "_self")
      },
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
 
  //makeEmpty() {
  //  this.form.patchValue({
  //    CustomerName: null,
  //    LastName: null,
  //    Address1: null,
  //    // ProductSubscriptionTypeId: [1],
  //    PostalCode: null,
  //    City: null,
  //    Country:null,
  //    Phone: null,
  //    Email: null,
  //    Password: null,
  //    Price: null,
  //    TotalPrice:null,
  //    CouponCode: null,
  //    Discount: null,
  //    NoOfMachines: 1,
  //  });
  //}
  ngAfterViewInit(): void {
   // this.makeEmpty();
  }

}



