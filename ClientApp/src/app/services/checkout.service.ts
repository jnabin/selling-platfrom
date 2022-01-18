import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor( private http: HttpClient) { }

  public updateRazorpayCheckout(razorpay_payment_id:string,razorpay_order_id:string,razorpay_signature:string ) {
    
    var body = {
      RazorpayPaymentId: razorpay_payment_id,
      RazorpayOrderId: razorpay_order_id,
      RazorpaySignature:razorpay_signature
    }
    return this.http.post(environment.BaseURI + 'RazorpayCheckout/RazorpayPaymentCallback',body);
    
  }

  // invokeLicenseGeneratedCallback(licenseCrypt:string ) {
  //   var result= this.http.get(environment.BaseURI + 'RazorpayCheckout/license-generated/'+licenseCrypt);
  //   result.subscribe((res: any) => {
  //     this.invokeLicenseGeneratedCallback(res.LicenseCrypt);
  //   }, err => {
  //     // TODO redirect to error page
  //     //this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error, life: 3000 });
  //   });
  // }


  // TODO SOHAIL  Check if thisis used or not
  orderCheckout(data: any, productSubId: any, grandTotal: any, unitPrice: any) {

    var body = {
      ProductSubscriptionTypeId: productSubId,
      CustomerName: data.FirstName + " " + data.LastName,
      Phone: data.Phone,
      Country: data.Country,
      PostCode: data.PostalCode,
      PriceUSD: unitPrice,
      Quantity: data.NoOfMachines,
      SpecialDiscountPercent: 10, // TODO SOHAIL
      CouponDiscountPercent: data.CoupenCode,
      GrandTotalUSD: data.grandTotal,

      //Email :data.Email
    }
    return this.http.post(environment.BaseURI + 'Payment/CreateOrder', body);
  }

  //isEmailExist(data: any) {

  //  var body = {
  //    Email: data.Email
  //  }
  //  return this.http.post(environment.BaseURI + 'Subscribe/isEmailExist', body);
  //}

  getOrderDetail(ProdSubsTypeId: any, quantity: any, iso2Code: any, discountCode: any = null) {
    debugger
    return this.http.get(environment.BaseURI + 'Order/GetOrderDetail?ProductSubscriptionTypeId=' + ProdSubsTypeId + '&Quantity=' + quantity +
      '&iso2Code=' + iso2Code + '&DiscountCouponCode=' + discountCode)
  }

  GetQuotationCalculationDetail(ProdSubsTypeId: any, quantity: any, iso2Code: any, discountPercent: any = null) {
    debugger
    return this.http.get(environment.BaseURI + 'Order/QuotationCalculationDetail?ProductSubscriptionTypeId=' + ProdSubsTypeId +
      '&Quantity=' + quantity + '&iso2Code=' + iso2Code + '&DiscountPercent=' + discountPercent)
  }
  
  
  CreatePaypalOrder(data: any, calculatedValue: any, iso2CountryCode: any) {
    debugger
    var body = {
      "specialDiscountId": calculatedValue.specialDiscountId,
      "specialDiscountPercent": calculatedValue.specialDiscountPercent,
      "total1USD": calculatedValue.total1USD,
      "couponDiscountId": calculatedValue.couponDiscountId,
      "couponCode": calculatedValue.couponCode,
      "couponDiscountPercent": calculatedValue.couponDiscountPercent,
      "total2USD": calculatedValue.total2USD,
      "productSubscriptionTypeId": calculatedValue.productSubscriptionTypeId,
      "productName": calculatedValue.productName,
      "customerName": data.FirstName + " " + data.LastName,
      "phone": data.Phone,
      "addressLine1": data.AddressLine1,
      "addressLine2": data.AddressLine2,
      "city": data.City,
      "Iso2Code": iso2CountryCode,

      "localCurrencyCode": calculatedValue.localCurrencyCode,// "USD",
      "localToUSDMuiltiplier": 0, // TODO SOHAIL , why this ?

      "postCode": data.PostalCode,
      "priceUSD": calculatedValue.priceUSD,
      "quantity": calculatedValue.quantity,
      "gstPercent": calculatedValue.gstPercent,
      "gstValue": calculatedValue.gstValue,
      "totalDiscount": calculatedValue.totalDiscount,
      "grandTotalUSD": calculatedValue.grandTotalUSD
    }
    return this.http.post(environment.BaseURI + 'PaypalCheckout/CreateOrder', body);
  }

  
  // TODO Sohail Why is LocalToUSDMultiplier fixed as 0, please fix this
  CreateRazorpayOrder(data: any, calculatedValue: any, iso2CountryCode: any) {
    debugger;
    var body = {
      "specialDiscountId": calculatedValue.specialDiscountId,
      "specialDiscountPercent": calculatedValue.specialDiscountPercent,
      "total1USD": calculatedValue.total1USD,
      "couponDiscountId": calculatedValue.couponDiscountId,
      "couponCode": calculatedValue.couponCode,
      "couponDiscountPercent": calculatedValue.couponDiscountPercent,
      "total2USD": calculatedValue.total2USD,
      "productSubscriptionTypeId": calculatedValue.productSubscriptionTypeId,
      "productName": calculatedValue.productName,
      "customerName": data.FirstName + " " + data.LastName, // TODO SOHAIL
      "phone": data.Phone,
      "addressLine1": data.AddressLine1,
      "addressLine2": data.AddressLine2,
      "city": data.City,
      "Iso2Code": iso2CountryCode,
      "localCurrencyCode": calculatedValue.localCurrencyCode,// "USD",
      "localToUSDMuiltiplier": 0, // TODO SOHAIL
      "postCode": data.PostalCode,
      "priceUSD": calculatedValue.priceUSD,
      "quantity": calculatedValue.quantity,
      "gstPercent": calculatedValue.gstPercent,
      "gstValue": calculatedValue.gstValue,
      "totalDiscount": calculatedValue.totalDiscount,
      "grandTotalUSD": calculatedValue.grandTotalUSD
    }
    return this.http.post(environment.BaseURI + 'RazorPayCheckout/CreateOrder', body);
  }

}
