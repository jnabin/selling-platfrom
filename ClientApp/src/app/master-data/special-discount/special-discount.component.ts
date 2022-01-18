import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { SpecialDiscountService } from "../services/special-discount.service";
import { ConfirmationService, MessageService } from "primeng/api";

export interface ISpecialDiscount {
  specialDiscountId: string;
  productId: string;
  name: string;
  startDateUTC: Date;
  endDateUTC: Date;
  description: string;
  discountMessage: string;
  discountPercent: string;
  isActive: boolean;
}

@Component({
  selector: "app-special-discount",
  templateUrl: "./special-discount.component.html",
  styleUrls: ["./special-discount.component.scss"],
})
export class SpecialDiscountComponent implements OnInit {
  //#region  primeNG grid setting
  today =  new Date();
  tomorrow : any;
  minDate : any;
  showDialog: boolean = false;
  SpecialDiscounts: ISpecialDiscount[] = [];
  SpecialDiscount: ISpecialDiscount = {
    specialDiscountId: "", productId: "",
    name: "", startDateUTC: new Date(), endDateUTC: new Date(), description: "", discountMessage: "",
    discountPercent: "", isActive: false
  };
  ProductselectedSpecialDiscount: any = [];

  displayedColumns: string[] = [
    "specialDiscountId",
    "name",
    "discountMessage",
    "description",
    "discountPercent",
    "startDateUTC",
    "endDateUTC",
    "productId",
    "specialDiscountId",
    "isActive",
  ];
  first = 0;
  rows = 10;
  submitted: boolean = false;
  loading: boolean = false;
 // data: any;
  //#endregion

  products: any;

  constructor(
    public specialDiscountService: SpecialDiscountService,
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  ngOnInit(): void {
    this.tomorrow =new Date(this.today.setDate(this.today.getDate() + 1));
    this.GetAll();
    this.Getallproducts();
  }
  
  public New_Clicked() {
    this.SpecialDiscount = {} as any;
    this.submitted = false;
    this.showDialog = true;
  }
  public Edit_Clicked(SpecialDiscount: any) {
    this.SpecialDiscount = { ...SpecialDiscount };
    this.SpecialDiscount.startDateUTC = new Date(SpecialDiscount.startDateUTC);
    this.tomorrow = new Date(SpecialDiscount.startDateUTC);
    this.SpecialDiscount.endDateUTC = new Date(SpecialDiscount.endDateUTC);
    this.SpecialDiscount.productId = SpecialDiscount.productId;
    this.showDialog = true;
  }

  public Delete_Clicked(SpecialDiscount: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + SpecialDiscount.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.SpecialDiscounts = this.SpecialDiscounts.filter(
          (val) => val.specialDiscountId !== SpecialDiscount.specialDiscountId
        );
        this.specialDiscountService
          .deleteSpecialDiscount(SpecialDiscount.specialDiscountId)
          .subscribe(
            (res: any) => {
              this.messageService.add({
                severity: "success",
                summary: "Successful",
                detail: "SpecialDiscount Deleted",
                life: 3000,
              });
              this.GetAll();
            },
            (err) => {
              console.log(err);
            }
          );
        this.GetAll();
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
      this.SpecialDiscount.productId &&
      this.SpecialDiscount.name &&
      this.SpecialDiscount.startDateUTC &&
      this.SpecialDiscount.endDateUTC &&
      this.SpecialDiscount.discountPercent
    ) {
      if (this.SpecialDiscount.specialDiscountId) {
        this.Update();
      } else {
        this.SpecialDiscount.specialDiscountId = "";
        this.Create();
      }
    }
  }

  private GetAll() {
    this.specialDiscountService.GetAll().subscribe((res: any) => {
      console.log(res);
      this.SpecialDiscounts = res;
    });
  }
  private Getallproducts() {
    this.productService.GetAll().subscribe(
      (resp: any) => {
        this.products = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private Create() {
    this.specialDiscountService
      .saveSpecialDiscount(this.SpecialDiscount)
      .subscribe(
        (res: any) => {
            this.showDialog = false;
            this.SpecialDiscount = {} as any;
            this.GetAll();
        },
        (err) => {
          if(err.error["DiscountMessage"])
          {
            this.messageService.add({
              severity: "error",
              summary: "error",
              detail: err.error["DiscountMessage"][0],
              life: 3000,
            });
          }
          else
          {
            this.messageService.add({
              severity: "error",
              summary: "error",
              detail: err.error,
              life: 3000,
            });
          }

          
          console.log(err);
        }
      );
  }
  private Update() {
    if(this.SpecialDiscount.discountMessage=="")
    {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Discount Message is required",
        life: 3000,
      });
    }
    else{
    this.specialDiscountService
      .updateSpecialDiscount(this.SpecialDiscount)
      .subscribe(
        (res: any) => {
          this.showDialog = false;
          this.SpecialDiscount = {} as any;
          this.GetAll();
        },
        (err) => {
          if(err.error["DiscountMessage"])
          {
            this.messageService.add({
              severity: "error",
              summary: "error",
              detail: err.error["DiscountMessage"][0],
              life: 3000,
            });
          }
          else
          {
            this.messageService.add({
              severity: "error",
              summary: "error",
              detail: err.error,
              life: 3000,
            });
          }
          console.log(err);
        }
      );
    }
  }
  onBlurMethod(event){
    this.minDate =event;
  }
  private findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.SpecialDiscounts.length; i++) {
      if (this.SpecialDiscounts[i].specialDiscountId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
