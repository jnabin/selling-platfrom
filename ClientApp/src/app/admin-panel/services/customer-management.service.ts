import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  getAllCustomerManagement(){
    return this.http.get(environment.BaseURI + 'User');
    }
    saveCustomerManagement(data:any){
      
      var body={
        Email :data.Email,
        PriceUSD :data.PriceUSD,
        ProductSubscriptionTypeId:data.ProductSubscriptionTypeId,
        DiscountPercent :data.DiscountPercent,
        Quantity :data.Quantity,
        Country :data.Country,
        GSTPercent :data.GSTPercent,
        InternalComment :data.InternalComment,

      }
    return this.http.post(environment.BaseURI + 'Quotation',body);
    }
}
