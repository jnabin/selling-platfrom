import { Component, OnInit } from "@angular/core";
import { SubscriptionTypeService } from "src/app/master-data/services/subscription-type.service ";
import { ProductService } from "../services/product.service";
import { ProductSubscriptionTypeService } from "../services/product-subscription-type.service";
import { ConfirmationService, MessageService } from "primeng/api";

export interface IProductSubscription {
  productSubscriptionTypeId: string,
  productId: string,
  subscriptionTypeId: string,
  priceUSD: string,
  isActive: boolean | true;
}
@Component({
  selector: "app-product-subscription",
  templateUrl: "./product-subscription-type.component.html",
  styleUrls: ["./product-subscription-type.component.scss"],
})
export class ProductSubscriptionTypeComponent implements OnInit {
  products: any;
  SubscriptionType: any;
  //#region  primeNG grid setting
  showDialog: boolean=false;
  ProductSubscriptionTypes: IProductSubscription[] = [];
  ProductsubscriptionType: IProductSubscription = {
     productSubscriptionTypeId: "",productId: "",subscriptionTypeId: "",priceUSD: "",isActive: true};
  ProductselectedsubScriptionType: any = [];
  displayedColumns: string[] = [
    "productSubscriptionTypeId",
    "productId",
    "subscriptionTypeId",
    "priceUSD",
  ];
  first = 0;
  rows = 10;
  submitted: boolean=false;
  loading: boolean = false;
  //#endregion

  constructor(
    public SubscriptionTypeService: SubscriptionTypeService,
    public productSubscriptionTypeService: ProductSubscriptionTypeService,
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.GetAll();
    this.GetAllProducts();
    this.getSubscriptionTypes();
  }
  
  public New_Clicked() {
    this.ProductsubscriptionType = {} as any;
    this.submitted = false;
    this.showDialog = true;
  }
  public Edit_Clicked(subscriptionType: any) {
    this.ProductsubscriptionType = { ...subscriptionType };

    this.showDialog = true;
  }

  public Delete_Clicked(item: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete ?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.productSubscriptionTypeService
          .deleteProductSubscription(item.productSubscriptionTypeId)
          .subscribe(
            (res: any) => {
              this.ProductsubscriptionType = {} as any;
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
              ;
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
    ;
    if (
      this.ProductsubscriptionType.productId &&
      this.ProductsubscriptionType.subscriptionTypeId &&
      parseInt(this.ProductsubscriptionType.priceUSD) > 0
    ) {
      if (this.ProductsubscriptionType.productSubscriptionTypeId) {
        this.Update();
        this.GetAll();
      } else {
        this.Create();
        this.GetAll();
      }
    }
  }

  private GetAll() {
    this.loading = true;
    this.productSubscriptionTypeService.GetAll().subscribe((res: any) => {
      this.ProductSubscriptionTypes = res;

      this.loading = false;
    });
  }
  private GetAllProducts() {
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
    this.loading = true;
    this.productSubscriptionTypeService
      .saveProductSubscription(this.ProductsubscriptionType)
      .subscribe(
        (resp: any) => {
          this.loading = false;
          this.showDialog = false;
          this.ProductsubscriptionType = {} as any;
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Created Successfully",
            life: 3000,
          });
          this.GetAll();
        },
        (err) => {
          this.loading = false;
          console.log(err);
          this.messageService.add({
            severity: "error",
            summary: "error",
            detail: err.error,
            life: 3000,
          });
        }
      );
  }
  private Update() {
    this.productSubscriptionTypeService
      .updateProductSubscription(this.ProductsubscriptionType)
      .subscribe(
        (resp: any) => {
          this.loading = false;
          this.showDialog = false;
          this.ProductsubscriptionType = {} as any;
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Updated Successfully",
            life: 3000,
          });
          this.GetAll();
        },
        (err) => {
          this.loading = false;
          console.log(err);
          this.messageService.add({
            severity: "error",
            summary: "error",
            detail: err.error,
            life: 3000,
          });
        }
      );
  }

  private getSubscriptionTypes() {
    this.SubscriptionTypeService.GetAll().subscribe(
      (resp: any) => {
        this.SubscriptionType = resp;
        console.log(this.SubscriptionType);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.ProductSubscriptionTypes.length; i++) {
      if (this.ProductSubscriptionTypes[i].subscriptionTypeId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
