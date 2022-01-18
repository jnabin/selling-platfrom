import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialDiscountService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  GetAll(){
    return this.http.get(environment.BaseURI + 'SpecialDiscount');
    }
    saveSpecialDiscount(data:any){
      
        var body={
          ProductId:parseInt(data.productId),
          Name:data.name,
          Description:data.description,
          StartDateUTC :  data.startDateUTC,
          EndDateUTC :  data.endDateUTC,
          DiscountPercent:data.discountPercent,
          DiscountMessage:data.discountMessage,
          ProductSubscriptionTypeId:1,
          IsActive:data.isActive
        }
        return this.http.post(environment.BaseURI + 'SpecialDiscount',body);
    }
    updateSpecialDiscount(data:any){
        var body={
          SpecialDiscountId :  parseInt(data.specialDiscountId),
          ProductId:parseInt(data.productId),
          Name: data.name,
          Description:data.description,
          StartDateUTC :  data.startDateUTC,
          EndDateUTC :  data.endDateUTC,
          DiscountPercent:data.discountPercent,
          DiscountMessage:data.discountMessage,
          ProductSubscriptionTypeId:1,
          IsActive:data.isActive
        }
        return this.http.put(environment.BaseURI + 'SpecialDiscount',body);
    }
    deleteSpecialDiscount(id:any){
      return this.http.delete(environment.BaseURI + 'SpecialDiscount/'+id);
    }
    getSpecialDiscountById(id:any){
      return this.http.get(environment.BaseURI + 'SpecialDiscount/GetById?id='+id);
    }
}
