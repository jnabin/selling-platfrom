import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContactService } from '../../services/contact.service';
import { IQuotation } from '../ap-quotation/ap-quotation.component';
import { OrderService } from '../services/order.service';

export interface IOrder {
  orderId: number;
  quotationId: number;
  appUserId: number;
  productSubscriptionTypeId: number;
  priceUSD: number;
  quantity: number;
  localCurrencyCode: string;
  rupeeToUSDMultiplier: number;
  localToUSDMultiplier: number;
  discountPercent: number;
  gSTPercent: number;
  grandTotalUSD: number;
  verificationGuid: string;
  isActive: boolean;
  internalComment: string;
}
@Component({
  selector: 'app-ap-contact',
  templateUrl: './ap-contact.component.html',
  styleUrls: ['./ap-contact.component.scss'],
})
export class ApContactComponent implements OnInit {
  //#region  primeNG grid setting
  Contacts: any[] = [];
  displayedColumns: string[] = [
    'id',
    'contact',
    'email',
    'message',
    'name',
    'resolutionDateUTC',
    'resolvedBy',
    'subject',
  ];
  first = 0;
  rows = 10;
  loading: boolean = false;
  isNewClicked: boolean;
  isEditClicked: boolean;
 
  showDialog: boolean;
  submitted: boolean;
  //#endregion

  constructor(
    private messageService: MessageService,
    public contact: ContactService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.GetAll();
  }
  GetAll() {
    this.loading = true;
    this.contact.GetAll().subscribe((res: any) => {
      this.Contacts = res;
      console.log(res);
      this.loading = false;
    });
  }
  Edit_Clicked(item: any) {
    this.loading = true;
    this.confirmationService.confirm({
      message:
        '<b>Are you sure you want to Deactivated the Quotation ? </b><br/>',
      header: 'Confirm',
      icon: 'pi pi-question',
      accept: () => {
        this.contact.CloseTicket(item.id).subscribe((res: any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Closed successfully",
            life: 3000,
          });
          this.loading = false;
        }, err => {
          console.log(err)
          this.loading = false;
        });
       
      },
    });
   
   
  }
  public Cancel_Clicked() {
    debugger;
    this.showDialog = false;
    this.submitted = false;
  }
 
}
