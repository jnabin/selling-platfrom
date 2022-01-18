import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QuotationCheckoutService {

  constructor(private http: HttpClient) { }

  getSavedQuotationCalculation(id:number, iso2Code:string){
    const params = new HttpParams()
   .set('quotationId', id)
   .set('iso2Code', iso2Code);
    return this.http.get(environment.BaseURI + 'Order/GetSavedQuotationCalculation', {params}).
    pipe(
      map(response => response)
    );
  }

  CreatePaypalOrder(data: any, calculatedValue: any) {
    const body = {
      "total1USD": calculatedValue.total1USD,
      "productSubscriptionTypeId": calculatedValue.productSubscriptionTypeId,
      "productName": calculatedValue.productName,
      "customerName": data.CustomerName,
      "phone": data.Phone,
      "addressLine1": data.AddressLine1,
      "addressLine2": data.AddressLine2,
      "city": data.City,
      "iso2Code": calculatedValue.iso2Code,
      "quotationDiscountPercent":calculatedValue.quotationDiscountPercent,
      "localCurrencyCode": calculatedValue.localCurrencyCode,
      "localToUSDMuiltiplier": calculatedValue.localToUSDMuiltiplier,
      "postCode": data.PostalCode,
      "priceUSD": calculatedValue.priceUSD,
      "quantity": calculatedValue.quantity,
      "gstPercent": calculatedValue.gstPercent,
      "gstValue": calculatedValue.gstValue,
      "totalDiscount": calculatedValue.totalDiscount,
      "grandTotalUSD": calculatedValue.grandTotalUSD,
      "quotationId":calculatedValue.quotationId
    }

    return this.http.post(environment.BaseURI + 'PaypalCheckout/CreateOrderFromQuotation', body);
  }

  CreateRazorpayOrder(data: any, calculatedValue: any) {
    const body = {
      "total1USD": calculatedValue.total1USD,
      "productSubscriptionTypeId": calculatedValue.productSubscriptionTypeId,
      "productName": calculatedValue.productName,
      "customerName": data.CustomerName,
      "phone": data.Phone,
      "addressLine1": data.AddressLine1,
      "addressLine2": data.AddressLine2,
      "city": data.City,
      "iso2Code": calculatedValue.iso2Code,
      "localCurrencyCode": calculatedValue.localCurrencyCode,
      "localToUSDMuiltiplier": calculatedValue.localToUSDMuiltiplier,
      "postCode": data.PostalCode,
      "priceUSD": calculatedValue.priceUSD,
      "quantity": calculatedValue.quantity,
      "gstPercent": calculatedValue.gstPercent,
      "gstValue": calculatedValue.gstValue,
      "totalDiscount": calculatedValue.totalDiscount,
      "grandTotalUSD": calculatedValue.grandTotalUSD,
      "quotationDiscountPercent":calculatedValue.quotationDiscountPercent,
      "quotationId":calculatedValue.quotationId
    }

    return this.http.post(environment.BaseURI + 'RazorPayCheckout/CreateOrderFromQuotation', body);
  }

}
