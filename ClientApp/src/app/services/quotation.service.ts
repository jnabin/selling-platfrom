import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { IQuotation } from '../admin-panel/ap-quotation/ap-quotation.component';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get(environment.BaseURI + "Quotation" );
  }

  Create(item: any) {
    //var body = {
    //  Email: data.Email,
    //  PriceUSD: data.PriceUSD,
    //  ProductSubscriptionTypeId: data.ProductSubscriptionTypeId,
    //  DiscountPercent: data.DiscountPercent,
    //  Quantity: data.Quantity,
    //  Country: data.Country,
    //  GSTPercent: data.GSTPercent,
    //  InternalComment: data.InternalComment,
    //};
    return this.http.post(environment.BaseURI + "Quotation", item);
  }

  Update(item: any) {
    return this.http.put(environment.BaseURI + 'Quotation/Deactivate', item);
  }
  Deactivate(item: any) {
    return this.http.put(environment.BaseURI + 'Deactivate', item);
  }
  GetAllOrder(){
    return this.http.get(environment.BaseURI + 'Order');
  }
  EditInternalComment(item :any){
    return this.http.put(environment.BaseURI + 'Quotation/UpdateComment', item);
  }
  //Deactivate(id: number) {
  //  return this.http.delete(environment.BaseURI + 'Quotation/Deactivate/' + id);
  //}
  GetById(id: number) {
    return this.http.get(environment.BaseURI + 'Quotation/GetById?id=' + id);
  }


}
