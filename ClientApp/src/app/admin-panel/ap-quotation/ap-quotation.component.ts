import { QuotationCheckoutService } from './../../services/quotation-checkout.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CountryService } from '../../master-data/services/country.service';
import { ProductSubscriptionTypeService } from '../../master-data/services/product-subscription-type.service';
import { CheckoutService } from '../../services/checkout.service';
import { QuotationService } from '../../services/quotation.service';
//import { IProdsubstype } from './iprodsubstype';

export interface IQuotation {
  quotationId: number;
  email: string;
  iso2Code: string;
  productSubscriptionTypeId: number;
  priceUSD: number;
  quantity: number;
  discountPercent: number;
  gstPercent: number;
  grandTotalUSD: number;
  internalComment: string;
  isActive: boolean | true;
}

@Component({
  selector: 'app-ap-quotation',
  templateUrl: './ap-quotation.component.html',
  styleUrls: ['./ap-quotation.component.scss'],
})
export class ApQuotationComponent implements OnInit {
  public Quotation: IQuotation = {
    quotationId: 0,
    email: null,
    productSubscriptionTypeId: null,
    iso2Code: null,
    priceUSD: null,
    quantity: null,
    discountPercent: null,
    gstPercent: null,
    grandTotalUSD: null,
    internalComment: null,
    isActive: null,
  };

  displayedColumns: string[] = [
    'orderId',
    'iso2Code',
    'product',
    'subscriptionType',
    'priceUSD',
    'discountPercent',
    'gstPercent',
    'grandTotalUSD',
    'createdDateUTC',
    'isActive',
  ];
  first = 0;
  rows = 5;
  submitted: boolean = false;
  loading: boolean = false;
  Quotations: any; // Bound to form control
  showDialog: boolean = false;
  InternalComment: boolean = false;
  EditQuestionId: any;
  EditinternalComment: string;
  AllProductSubscriptionTypes: any[] = [];
  selectedProductSubscriptionType: any = {
    productSubscriptionTypeId: null,
    priceUSD: null,
  };
  selecedcountry: any;
  AllCountries: any = [];
  isNewClicked: boolean = false;
  isEditClicked: boolean = false;

  calculatedQuotationDetail: any = {
    
  };

  calculatedOrderDetail: any = {
    country: null,
    couponCode: null,
    couponDiscountId: null,
    couponDiscountPercent: null,
    customerName: null,
    grandTotalUSD: null,
    gstPercent: null,
    gstValue: null,
    phone: null,
    postCode: null,
    priceUSD: null,
    productName: null,
    productSubscriptionTypeId: null,
    quantity: null,
    specialDiscountId: null,
    specialDiscountPercent: null,
    discountPercent: null,
    total1USD: null,
    total2USD: null,
    totalDiscount: null,
  };

  userTestStatus: { id: number; name: string }[] = [
    { id: 0, name: 'Available' },
    { id: 1, name: 'Ready' },
    { id: 2, name: 'Started' },
  ];

  constructor(
    private checkoutService: CheckoutService,
    private quotationService: QuotationService,
    private prodSubsTypeService: ProductSubscriptionTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public countryService: CountryService
  ) {}

  ngOnInit() {
    this.GetAll();
    this.GetAllCountries();
    this.GetAllProductSubscriptionTypes();
  }

  public New_Clicked() {
    this.isNewClicked = true;
    this.isEditClicked = false;
    this.calculatedQuotationDetail = {
      country: null,
      couponCode: null,
      couponDiscountId: null,
      couponDiscountPercent: null,
      customerName: null,
      grandTotalUSD: null,
      gstPercent: null,
      gstValue: null,
      phone: null,
      postCode: null,
      priceUSD: null,
      productName: null,
      productSubscriptionTypeId: null,
      quantity: null,
      specialDiscountId: null,
      specialDiscountPercent: null,
      discountPercent: null,
      total1USD: null,
      total2USD: null,
      totalDiscount: null,
    };

    this.calculatedOrderDetail = {
      country: null,
      couponCode: null,
      couponDiscountId: null,
      couponDiscountPercent: null,
      customerName: null,
      grandTotalUSD: null,
      gstPercent: null,
      gstValue: null,
      phone: null,
      postCode: null,
      priceUSD: null,
      productName: null,
      productSubscriptionTypeId: null,
      quantity: null,
      specialDiscountId: null,
      specialDiscountPercent: null,
      discountPercent: null,
      total1USD: null,
      total2USD: null,
      totalDiscount: null,
    };
    this.Quotation = {} as IQuotation;
    this.submitted = false;
    this.showDialog = true;
  }

  public Deactivate_Clicked(quotation: IQuotation) {
    debugger;
    this.confirmationService.confirm({
      message:
        '<b>Are you sure you want to Deactivated the Quotation ? </b><br/>',
      header: 'Confirm',
      icon: 'pi pi-question',
      accept: () => {},
    });
    // this.confirmationService.confirm({
    //   message: "Are you sure you want to Deactivated ?",
    //   header: "Confirm",
    //   icon: "pi pi-exclamation-triangle",
    //   accept: () => {
    //     this.quotationService
    //       .Update(quotation)
    //       .subscribe(
    //         (res: any) => {
    //           this.quotationService = {} as any;
    //           this.messageService.add({
    //             severity: "success",
    //             summary: "Successful",
    //             detail: "quotation deactivated",
    //             life: 3000,
    //           });
    //           this.GetAll();
    //         },
    //         (err) => {
    //           console.log(err);
    //           ;
    //           this.messageService.add({
    //             severity: "error",
    //             summary: "Error",
    //             detail: err.error,
    //             life: 3000,
    //           });
    //         }
    //       );
    //   },
    // });
    // this.isNewClicked = false;
    // this.isEditClicked = true;
    // this.selectedProductSubscriptionType = {
    //   isActive: true,
    //   priceUSD: 77,
    //   product: "Product1333321",
    //   productId: 1,
    //   productSubscriptionTypeId: 1,
    //   subscriptionType: "Name1",
    //   subscriptionTypeId: 1}
    // debugger
    // this.Quotation = { ...quotation};
    // this.showDialog = true;
  }
  public Edit_Clicked(quotation: IQuotation) {
    debugger;
    this.InternalComment = true;
    this.EditinternalComment = quotation.internalComment;
    this.EditQuestionId = quotation.quotationId;
  }
  public Ok_ClickedUpdateInternal() {
    debugger;
    var tmsp = this.Quotation.isActive;
    var tmp = {
      quotationId: this.EditQuestionId,
      internalComment: (<HTMLInputElement>document.getElementById('internalComment')).value,
    };
    this.quotationService.EditInternalComment(tmp).subscribe(
      (res: any) => {
        this.Quotation = {} as any;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Internal Comment Updated Successfully',
          life: 3000,
        });
        this.GetAll();
        this.InternalComment = false;
      },
      (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
          life: 3000,
        });
      }
    );
    if (tmsp) {
      this.quotationService.Update(this.EditQuestionId).subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Quotation Deactivated',
            life: 3000,
          });
          this.GetAll();
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: err.error,
            life: 5000,
          });
        }
      );
    }
   
  }
  //public Deactivate_Clicked(item: IQuotation) {
  //  this.confirmationService.confirm({
  //    message: "Are you sure you want to delete Quotation ID:" + item.quotationId + "?",
  //    header: "Confirm",
  //    icon: "pi pi-exclamation-triangle",
  //    accept: () => {
  //      this.quotationService
  //        .Deactivate(item.quotationId)
  //        .subscribe(
  //          (res: any) => {
  //            this.Quotation = {} as any;
  //            this.messageService.add({
  //              severity: "success",
  //              summary: "Success",
  //              detail: "Deleted Successfully",
  //              life: 3000,
  //            });
  //            this.GetAll();
  //          },
  //          (err) => {
  //            console.log(err);
  //            this.messageService.add({
  //              severity: "error",
  //              summary: "Error",
  //              detail: err.error,
  //              life: 3000,
  //            });
  //          }
  //        );
  //    },
  //  });
  //}

  public Cancel_Clicked() {
    debugger;
    this.showDialog = false;
    this.submitted = false;
  }

  public Ok_Clicked() {
    debugger;
    this.Quotation.iso2Code = this.selecedcountry;
    this.Quotation.productSubscriptionTypeId =
      this.selectedProductSubscriptionType.productSubscriptionTypeId;
    this.Quotation.priceUSD = this.selectedProductSubscriptionType.priceUSD;
    this.Quotation.gstPercent = this.calculatedOrderDetail.gstPercent;
    this.Quotation.grandTotalUSD = this.calculatedOrderDetail.grandTotalUSD;
    this.submitted = true;
    if (
      this.Quotation.discountPercent &&
      this.Quotation.email &&
      this.Quotation.iso2Code &&
      this.Quotation.quantity &&
      this.Quotation.productSubscriptionTypeId &&
      this.Quotation.internalComment
    ) {
      if (this.Quotation.quotationId > 0) {
        this.Update();
      } else {
        this.Create();
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Mandatory fields missing',
        life: 3000,
      });
    }
  }

  private GetAll() {
    this.quotationService.GetAll().subscribe(
      (res: any) => {
        console.log(this.Quotations);
        this.Quotations = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //private GetProductSubscriptionTypes() {

  //  this.prodSubsTypeService.GetAll().subscribe((res: any) => {
  //    debugger
  //    let i: number = 0;

  //    //this.ProductSubscriptionTypes = [{length:2}]
  //    for (var item of res) {
  //      let temp: { id: number, name: string } = {
  //        id : item.productSubscriptionTypeId,
  //        name : item.product + ' ' + item.subscriptionType
  //      }
  //      i++
  //      this.ProductSubscriptionTypes.push(temp);
  //    }
  //    debugger
  //    //this.ProductSubscriptionTypes = res
  //  }, err => {
  //    debugger
  //    console.log(err);
  //  })
  //}

  private GetAllProductSubscriptionTypes() {
    this.prodSubsTypeService.GetAll().subscribe(
      (res: any) => {
        debugger;
        this.AllProductSubscriptionTypes = res;
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: err.error,
          life: 3000,
        });
      }
    );
  }

  GetAllCountries() {
    this.countryService.getAll().subscribe(
      (resp: any) => {
        debugger;
        this.AllCountries = resp;
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: err.error,
          life: 3000,
        });
      }
    );
  }

  private Update() {
    debugger;
    this.quotationService.Update(this.Quotation).subscribe(
      (resp: any) => {
        this.loading = false;
        this.GetAll();
        this.showDialog = false;
        this.Quotation = {} as any;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated Successfully',
          life: 3000,
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: err.error,
          life: 3000,
        });
      }
    );
  }

  private Create() {
    debugger;
    this.quotationService.Create(this.Quotation).subscribe(
      (resp: any) => {
        this.loading = false;
        this.GetAll();
        this.showDialog = false;
        this.Quotation = {} as any;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Created Successfully',
          life: 3000,
        });
      },
      (err) => {
        debugger;
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: err.error,
          life: 3000,
        });
      }
    );
  }

  public getPriceDetail() {
    debugger;
    if (
      this.selectedProductSubscriptionType &&
      this.Quotation.quantity &&
      this.selecedcountry
    ) {
      if (this.Quotation.discountPercent) {
        this.checkoutService
          .GetQuotationCalculationDetail(
            this.selectedProductSubscriptionType.productSubscriptionTypeId,
            this.Quotation.quantity,
            this.selecedcountry,
            this.Quotation.discountPercent
          )
          .subscribe(
            (res: any) => {
              console.log(res);
              this.calculatedQuotationDetail = res;
            },
            (err) => {
              this.emptyQuotationControls();
              this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: err.error,
                life: 3000,
              });
            }
          );
      } else {
        this.emptyQuotationControls();
      }

      this.checkoutService
        .getOrderDetail(
          this.selectedProductSubscriptionType.productSubscriptionTypeId,
          this.Quotation.quantity,
          this.selecedcountry,
          ''
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            debugger;
            this.calculatedOrderDetail = res;
          },
          (err) => {
            this.emptyOrderControls();
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: err.error,
              life: 3000,
            });
          }
        );
    } else {
      this.emptyQuotationControls();
      this.emptyOrderControls();
    }
  }

  private emptyQuotationControls() {
    this.calculatedQuotationDetail.grandTotalUSD = null;
  }

  private emptyOrderControls() {
    this.calculatedOrderDetail.grandTotalUSD = null;
    this.calculatedOrderDetail.specialDiscountPercent = null;
    this.calculatedOrderDetail.total1USD = null;
    this.calculatedOrderDetail.total2USD = null;
    this.calculatedOrderDetail.gstPercent = null;
    this.calculatedOrderDetail.gstValue = null;
  }

  private findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Quotations.length; i++) {
      if (this.Quotations[i].QuotationId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  ngOnDestroy(): void {}
}
