import { Component, OnInit } from '@angular/core';
import { QuotationService } from 'src/app/services/quotation.service';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss']
})
export class BillingHistoryComponent implements OnInit {

  constructor(private quotationService: QuotationService) { }
  GetAllOrder: any;
  first = 0;
  rows = 5;
  loading: boolean = false;
  displayedColumns: string[] = [
    "orderId",
    "quotationId",
    "appUserId",
    "paymentMethodId",
    "productSubscriptionTypeId",
    "product",
    "customerName",
    "subscriptionType",
    "phone",
    "country",
    "postCode",
    "address",
    "priceUSD",
    "quantity",
    "localCurrencyCode",
    "rupeeToUSDMultiplier",
    "localToUSDMultiplier",
    "specialDiscountId",

    "couponDiscountId",
    "couponDiscountPercent",
    "quotationDiscountPercent",
    "totalDiscountValue",
    "gstPercent",
    "gstValue",
    "grandTotalUSD",
    "createdDateUTC"
  ];
  ngOnInit(): void {
    this.GetAll();
  }
  private GetAll() {
    this.quotationService.GetAllOrder().subscribe((res: any) => {
      this.GetAllOrder = res
    }, err => {
      console.log(err);
    })
  }
}
