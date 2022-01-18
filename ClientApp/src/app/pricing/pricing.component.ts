import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ProductSubscriptionTypeService } from '../master-data/services/product-subscription-type.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  public data: any;
  monthly: any;
  yearly: any;
  val="dsada"
//    = {
//    discountMessage,
//isActive,priceUSD: 77
//product,productId,productSubscriptionTypeId,specialDiscountPercent,subscriptionType,subscriptionTypeId}

  constructor(private primengConfig: PrimeNGConfig, public prodSubType: ProductSubscriptionTypeService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAll();
  }
  getAll() {
    this.prodSubType.GetAll().subscribe((res: any) => {
      console.log(res)
      this.monthly = res[0];
      this.yearly = res[1];
      this.data = res;
    })
  }

}
