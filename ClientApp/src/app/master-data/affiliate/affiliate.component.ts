import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { SubscriptionTypeService } from "src/app/master-data/services/subscription-type.service ";
import { environment } from "src/environments/environment.prod";
import { CouponDiscountService } from "../services/coupon-discount.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { ProductSubscriptionTypeService } from "../services/product-subscription-type.service";
import { AffiliateService } from "../services/affiliate.service";

export interface IProductSubscription {
  affiliateId: string;
  name: string;
  description: string;
  contact: string;
  isActive: boolean;
}

@Component({
  selector: "app-affiliate",
  templateUrl: "./affiliate.component.html",
  styleUrls: ["./affiliate.component.scss"],
})
export class AffiliateComponent implements OnInit {
  data: any;
  //#region  primeNG grid setting
  showDialog: boolean=false;
  Affliates: IProductSubscription[] = [];
  Affliate: IProductSubscription={ affiliateId: "",name: "",description: "",contact: "",isActive: false};
  ProductselectedsubScriptionType: any = [];
  displayedColumns: string[] = [
    "affiliateId",
    "name",
    "contact",
    "description",
    "isActive",
  ];
  first = 0;
  rows = 10;
  submitted: boolean=false;
  loading: boolean = false;
  //#endregion

  constructor(
    private affliateService: AffiliateService,
    public coupenDiscount: CouponDiscountService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }
  ngOnInit(): void {
    this.GetAll();
  }
 
  public New_Clicked() {
    this.Affliate = {} as any;
    this.submitted = false;
    this.showDialog = true;
  }
  public Edit_Clicked(subscriptionType: any) {
    this.Affliate = { ...subscriptionType };
    this.showDialog = true;
  }

  public Delete_Clicked(affliate: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + affliate.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.affliateService.deleteAffiliate(affliate.affiliateId).subscribe(
          (res: any) => {
            this.Affliate = {} as any;
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "SubscriptionType Deleted",
              life: 3000,
            });
            this.GetAll();
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
      },
    });
  }

  public Cancel_Clicked() {
    this.showDialog = false;
    this.submitted = false;
  }

  public Ok_Clicked() {
    this.submitted = true;
    if (this.Affliate.name && this.Affliate.contact) {
      if (this.Affliate.affiliateId) {
        this.Update();
      } else {
        this.Affliate.affiliateId = "";
        this.Create();
      }
    }
  }
  private GetAll() {
    this.loading = true;
    this.affliateService.GetAll().subscribe((res: any) => {
      this.data = res;
      console.log(res);
      this.loading = false;
    });
  }
  private Create() {
    this.affliateService.saveAffiliate(this.Affliate).subscribe(
      (resp: any) => {
        this.loading = false;
        this.GetAll();
        this.showDialog = false;
        this.Affliate = {} as any;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Created Successfully",
          life: 3000,
        });
      },
      (err) => {
        ;
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
    this.affliateService.updateAffiliate(this.Affliate).subscribe(
      (resp: any) => {
        this.loading = false;
        this.GetAll();
        this.showDialog = false;
        this.Affliate = {} as any;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Updated Successfully",
          life: 3000,
        });
      },
      (err) => {
        ;
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
  private findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Affliates.length; i++) {
      if (this.Affliates[i].affiliateId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  ngOnDestroy(): void {}
}
