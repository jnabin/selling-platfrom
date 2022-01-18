import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionTypeService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  
  GetAll(){
    return this.http.get(environment.BaseURI + 'SubscriptionType');
    }
  saveSubscriptionType(data:any){
    
      var body={
        Name:data.name,
        Description :  data.description,
        ValidityDays: data.validityDays,
        IsActive:true
      }
      return this.http.post(environment.BaseURI + 'SubscriptionType',body);
  }
  updateSubscriptionType(data:any){
    
      var body={
        SubscriptionTypeId : parseInt(data.subscriptionTypeId),
        Name:data.name,
        Description :  data.description,
        ValidityDays: data.validityDays,
        IsActive:true
      }
      return this.http.put(environment.BaseURI + 'SubscriptionType',body);
      ;
  }
  deleteSubscriptionType(id:any){
        return this.http.delete(environment.BaseURI + 'SubscriptionType/'+id);
  }
  getsubscriptionById(id:any){
    return this.http.get(environment.BaseURI + 'SubscriptionType/GetById?id='+id);
  }
}
