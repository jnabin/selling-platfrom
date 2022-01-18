import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CountryService } from 'src/app/master-data/services/country.service';
import { ProductSubscriptionTypeService } from 'src/app/master-data/services/product-subscription-type.service';
import { SubscriptionTypeService } from 'src/app/master-data/services/subscription-type.service ';

import { WindowRefService } from 'src/app/services/window-ref.service';
import { AuthService } from 'src/app/shared/core/auth.service';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../../account/service/user.service';
import { CheckoutService } from '../../services/checkout.service';
import { FormValidatorService } from '../../services/Util/form-validator.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('noteForm', { static: true })
  noteForm!: NgForm;
  type:string = '';
  public form: FormGroup;
  public emailForm: FormGroup;
  public totalPrice = 0;
  public grandTotal = 0;
  public productSubId=0;
  email:any="";
  loading = false;
  isLoggedIn = true;
  isEmailAlreadyExist = false;
  showOrderDetailForm = false;
  passwordMatch = false;
  tokenStorage: any = "";
  subscriptionData: any = [];
  productSubscriptionTypeData: any = [];
  country:any = [];
 // PackagePeriod = [{ code: 1,name: "Monthly" }, { code: 2,name: "Yearly" }];
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


  constructor(
    private checkoutService:CheckoutService,
    //private service: BillingService,
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
      //FirstName: [null, [Validators.required]],
      //LastName: ['Adhikary', [Validators.required]],
      CustomerName: [null, Validators.required],
      AddressLine1: [null, Validators.required],
      AddressLine2: [null],
      City: [null, Validators.required],
      //Address1: ['TEasdasd'],
      // ProductSubscriptionTypeId: [1],
      PostalCode: ['asdas', [Validators.maxLength(10)]],
      Country: [null],
      Phone: ['88888', Validators.required],
      Price: [null],
      TotalPrice: [null],
      CouponCode: [null],
      Discount: [null],
      NoOfMachines: [1],
    });
   
  }
   

  ngOnInit(): void {
    this.getProductSubscriptionType();
    this.getallcountries();
    this.isUserLoggedIn();
    //this.noteForm.resetForm();
  }
  getProductSubscriptionType() {
    this.prodSubService.GetAll().subscribe((res: any) => {
      //debugger
      this.PackagePeriod = res;
      this.activeRoute.queryParams.subscribe(params => {
        this.type = params['type'] as string;
        if(this.type == 'm'){
          this.selecedPackagePeriod = res[0].subscriptionTypeId;
        }else{
          this.selecedPackagePeriod = res[1].subscriptionTypeId;
        }  
      });        
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
    
    if (this.form.valid) {
      this.loading = true;
      this.checkoutService.orderCheckout(this.form.value, this.productSubId, this.grandTotal, 55).subscribe((res: any) => {
        this.loading = false;
        console.log(res)
     //   window.open(res.data, "_self")

        
      }, err => {
        this.loading = false;
      })
    } else {
      this.loading = false;
    }
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
  calculatePrice(firstTime: any) {
    if (this.iso2CountryCode != null){
      this.checkoutService.getOrderDetail(this.selecedPackagePeriod, this.quantity, this.iso2CountryCode, this.CouponCode).subscribe((res: any) => {
      console.log(res);
      this.orderDetail = res;
      }, err => {

        this.messageService.add({
          severity: "error",
          summary: "error",
          detail: err.error.message,
          life: 3000,
        });
    });
    } else if (!firstTime) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select country first',
        life: 3000,
      });
  }
  }
  createOrder(form: any) {
    
    if (this.form.valid) {
      if(this.iso2CountryCode !='IN'){
        this.checkoutService.CreatePaypalOrder(this.form.value, this.orderDetail,this.iso2CountryCode).subscribe((res: any) => {
          window.open(res.paymentUrl, "_self")
        }, err => {
         console.log(err)
        });
    }else{
      this.createRazorpayOrder(this.form);
    }
     
    }else{
      this.formValidator.validateAllFormFields(this.form);
    } 
  }
  changeStatus() {
    this.showOrderDetailForm = false;
  }
  createRazorpayOrder(form:any) {
    if (this.form.valid) {
      this.checkoutService.CreateRazorpayOrder(this.form.value, this.orderDetail,this.iso2CountryCode).subscribe((razorPayRes: any) => {
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
        var result  =  this.checkoutService.updateRazorpayCheckout(response.razorpay_payment_id,
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

