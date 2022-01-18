import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { SubscriptionTypeService } from "src/app/master-data/services/subscription-type.service ";
import { CouponDiscountService } from "../services/coupon-discount.service";
import { ProductService } from "../services/product.service";
import { DatePipe } from "@angular/common";
import { ConfirmationService, MessageService } from "primeng/api";

export interface ICouponDiscount {
  couponDiscountId: number;
  productId: number;
  productsubscriptionTypeId: string;
  couponCode: string;
  description: string;
  startDateUTC: Date;
  endDateUTC: Date;
  discountMessage: string;
  discountPercent: string;
  usageLimit: string;
 
}

@Component({
  selector: "app-coupon-discount",
  templateUrl: "./coupon-discount.component.html",
  styleUrls: ["./coupon-discount.component.scss"],
})
export class CouponDiscountComponent implements OnInit {
  datePipe = new DatePipe("en-US");
  //CouponDiscounts: any;

  //#region  primeNG grid setting
  showDialog: boolean=false;
  CouponDiscounts: ICouponDiscount[] = [];
  CouponDiscount: ICouponDiscount = { couponDiscountId: null,productId: null,productsubscriptionTypeId: null,couponCode: null,
    startDateUTC: new Date(), endDateUTC: new Date(), discountMessage: null, discountPercent: null, usageLimit: null,description:null
  };
  
  ProductselectedsubScriptionType: any = [];
  displayedColumns: string[] = [
    "couponCode",
    "couponDiscountId",
    "discountMessage",
    "discountPercent",
    "endDateUTC",
    "productId",
    "couponDiscountId",
    "startDateUTC",
    "usageLimit",
  ];
  first = 0;
  rows = 10;
  submitted: boolean=false;
  loading: boolean = false;
  //#endregion
  products: any;
  SubscriptionType: any;
  tomorrow : any;
  today =  new Date();
  minDate : any;
  constructor(
    public coupenDiscountService: CouponDiscountService,
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.tomorrow =new Date(this.today.setDate(this.today.getDate() + 1));
    this.GetAll();
    this.getallproducts();
    //this.getSubscriptionType();
  }
  onBlurMethod(event){
    this.minDate =event;
  }
  public New_Clicked() {
    this.CouponDiscount = {} as ICouponDiscount;
    this.submitted = false;
    this.showDialog = true;
  }
  public Edit_Clicked(subscriptionType: any) {
    this.CouponDiscount = { ...subscriptionType };
    this.CouponDiscount.startDateUTC = new Date(subscriptionType.startDateUTC);
    this.CouponDiscount.endDateUTC = new Date(subscriptionType.endDateUTC);
    this.CouponDiscount.productsubscriptionTypeId =
      subscriptionType.productSubscriptionTypeId;
    this.showDialog = true;
  }

  public Delete_Clicked(subscriptionType: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + subscriptionType.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.coupenDiscountService
          .deleteCouponDiscount(subscriptionType.couponDiscountId)
          .subscribe(
            (res: any) => {
              this.CouponDiscount = {} as any;
              this.messageService.add({
                severity: "success",
                summary: "Successful",
                detail: "SubscriptionType Deleted",
                life: 3000,
              });
              this.GetAll();
            },
            (err) => {
              console.log(err);
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: err.error,
                life: 3000,
              });
            }
          );
      },
    });
  }

  public Cancel_Clicked() {
    this.showDialog = false;
    this.submitted = false;
  }

  public Ok_Clicked() {
    this.submitted = true;
    if (
      this.CouponDiscount.productId &&
      this.CouponDiscount.couponCode &&
      this.CouponDiscount.startDateUTC &&
      this.CouponDiscount.endDateUTC &&
      this.CouponDiscount.usageLimit &&
      this.CouponDiscount.discountPercent &&
      this.CouponDiscount.discountMessage
    ) {
      if (this.CouponDiscount.couponDiscountId) {
        this.Update();
        this.GetAll();
      } else {
        this.CouponDiscount.couponDiscountId = null;
        this.Create();
        this.GetAll();
      }
    }
  }
  private GetAll() {
    this.coupenDiscountService.GetAll().subscribe((res: any) => {
      console.log(res);
      this.CouponDiscounts = res;
    });
  }
  private getallproducts() {
    this.productService.GetAll().subscribe(
      (res: any) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private Create() {
    this.coupenDiscountService
      .saveCouponDiscount(this.CouponDiscount)
      .subscribe(
        (res: any) => {
          this.showDialog = false;
          this.CouponDiscount = {} as any;
          this.GetAll();
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Created Successfully",
            life: 3000,
          });
        },
        (err) => {
          console.log(err.error);
          if(err.error["DiscountMessage"])
          {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.error["DiscountMessage"][0],
              life: 3000,
            });
          }
          else
          {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.error,
              life: 3000,
            });
          }
        }
      );
  }
  private Update() {
    if(this.CouponDiscount.discountMessage=="")
    {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Discount Message is required",
        life: 3000,
      });
    }
    else{
    this.coupenDiscountService
      .updateCouponDiscount(this.CouponDiscount)
      .subscribe(
        (res: any) => {
          this.showDialog = false;
          this.CouponDiscount = {} as any;
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Updated Successfully",
            life: 3000,
          });
        },
        (err) => {
          console.log(err.error);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.error,
            life: 3000,
          });
        }
      );
    }
  }
  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.CouponDiscounts.length; i++) {
      if (this.CouponDiscounts[i].couponDiscountId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  ngOnDestroy(): void {}
}
