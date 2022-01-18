import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-ap-order',
  templateUrl: './ap-order.component.html',
  styleUrls: ['./ap-order.component.scss'],
})
export class ApOrderComponent implements OnInit {
  //#region  primeNG grid setting
  Orders: any[] = [];
  Order: any;
  displayedColumns: string[] = [
    'orderId',
    'quotationId',
    'appUserId',
    'productSubscriptionTypeId',
    'priceUSD',
    'quantity',
    'localCurrencyCode',
    'rupeeToUSDMultiplier',
    'localToUSDMultiplier',
    'discountPercent',
    'gSTPercent',
    'grandTotalUSD',
    'verificationGuid',
    'isActive',
    'internalComment',
  ];
  first = 0;
  rows = 5;
  loading: boolean = false;
  //#endregion

  constructor(public orderService: OrderService) {}
  ngOnInit(): void {
    this.GetAll();
  }
  GetAll() {
    this.loading = true;
    this.orderService.GetAll().subscribe((res: any) => {
      this.Orders = res;
      this.loading = false;
    });
  }
}
