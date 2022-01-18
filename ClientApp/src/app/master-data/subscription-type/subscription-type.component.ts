import { Component, OnInit } from "@angular/core";
import { SubscriptionTypeService } from "src/app/master-data/services/subscription-type.service ";
import { ConfirmationService, MessageService } from "primeng/api";

export interface ISubscriptionType {
  subscriptionTypeId: string;
  name: string;
  validityDays: number;
  description: string;
}

@Component({
  selector: "app-subscription-type",
  templateUrl: "./subscription-type.component.html",
  styleUrls: ["./subscription-type.component.scss"],
})
export class SubscriptionTypeComponent implements OnInit {
  //#region  primeNG grid setting
  showDialog: boolean=false;
  SubscriptionTypes: ISubscriptionType[] = [];
  SubscriptionType: ISubscriptionType={subscriptionTypeId: "",name: "",validityDays: 0,description: ""};
  selectedsubScriptionType: any = [];
  displayedColumns: string[] = [
    "subscriptionTypeId",
    "name",
    "validityDays",
    "description",
  ];
  first = 0;
  rows = 10;
  submitted: boolean=false;
  loading: boolean = false;
  //#endregion

  constructor(
    public SubscriptionTypeService: SubscriptionTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.GetAll();
  }

  public New_Clicked() {
    this.SubscriptionType = {} as any;
    this.submitted = false;
    this.showDialog = true;
  }
  public Edit_Clicked(subscriptionType: any) {
    this.SubscriptionType = { ...subscriptionType };
    this.showDialog = true;
  }

  public Delete_Clicked(subscriptionType: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + subscriptionType.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.SubscriptionTypeService.deleteSubscriptionType(
          subscriptionType.subscriptionTypeId
        ).subscribe(
          (res: any) => {
            this.SubscriptionType = {} as any;
            this.messageService.add({
              severity: "success",
              summary: "Successful Successfully",
              detail: "Deleted",
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
    ;
    if (this.SubscriptionType.name && this.SubscriptionType.validityDays) {
      if (this.SubscriptionType.subscriptionTypeId) {
        this.Update(this.SubscriptionType);
      } else {
        this.SubscriptionType.subscriptionTypeId = "";
        this.Create(this.SubscriptionType);
      }
    }
  }

  private GetAll() {
    this.loading = true;
    this.SubscriptionTypeService.GetAll().subscribe((res: any) => {
      this.SubscriptionTypes = res;
      this.loading = false;
      console.log(res);
    });
  }
  private Create(subscriptionType: any) {
    this.SubscriptionTypeService.saveSubscriptionType(
      this.SubscriptionType
    ).subscribe(
      (resp: any) => {
        this.loading = false;
        this.SubscriptionTypes.push(subscriptionType);
        this.GetAll();
        this.showDialog = false;
        this.SubscriptionType = {} as any;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Created successfully",
          life: 3000,
        });
      },
      (err) => {
        ;
        console.log(err);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.error,
          life: 3000,
        });
      }
    );
  }
  private Update(subscriptionType: any) {
    this.SubscriptionTypeService.updateSubscriptionType(
      this.SubscriptionType
    ).subscribe(
      (resp: any) => {
        this.loading = false;
        ;
        this.GetAll();
        this.SubscriptionTypes[this.findIndexById(subscriptionType.subscriptionTypeId)] =
          subscriptionType;
        this.showDialog = false;
        this.SubscriptionType = {} as any;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Updated successfully",
          life: 3000,
        });
      },
      (err) => {
        ;
        console.log(err);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.error,
          life: 3000,
        });
      }
    );
  }
  private findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.SubscriptionTypes.length; i++) {
      if (this.SubscriptionTypes[i].subscriptionTypeId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}

