import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductSubscriptionTypeService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  GetAll(){
    return this.http.get(environment.BaseURI + 'ProductSubscriptionType');
    }
    saveProductSubscription(data:any){      
        var body={
          ProductId:data.productId ,
          SubscriptionTypeId: data.subscriptionTypeId ,
          PriceUSD: data.priceUSD ,
          IsActive:data.isActive
        }
        return this.http.post(environment.BaseURI + 'ProductSubscriptionType',body);
    }
    updateProductSubscription(data:any){
      
        var body={
          ProductSubscriptionTypeId:parseInt(data.productSubscriptionTypeId),
          ProductId:data.productId ,
          SubscriptionTypeId: data.subscriptionTypeId ,
          PriceUSD: data.priceUSD ,
          IsActive:data.isActive
        }
        return this.http.put(environment.BaseURI + 'ProductSubscriptionType',body);
    }
    deleteProductSubscription(id:any){
      return this.http.delete(environment.BaseURI + 'ProductSubscriptionType/'+id);
    }
    getProductSubscriptionById(id:any){
      return this.http.get(environment.BaseURI + 'ProductSubscriptionType/'+id);
    }
}
