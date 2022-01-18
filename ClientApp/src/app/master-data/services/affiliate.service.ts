import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
    GetAll(){
    return this.http.get(environment.BaseURI + 'Affiliate');
    }
    saveAffiliate(data:any){
      
        var body={
          Name:data.name,
          Contact :  data.contact,
          Description:data.description,
          IsActive:data.isActive
        }
        return this.http.post(environment.BaseURI + 'Affiliate',body);
    }
    updateAffiliate(data:any){
      
        var body={
          AffiliateId : parseInt(data.affiliateId),
          Name:data.name,
          Contact :  data.contact,
          Description:data.description,
          IsActive:data.isActive
        }
        return this.http.put(environment.BaseURI + 'Affiliate',body);
    }
    deleteAffiliate(id:any){
      return this.http.delete(environment.BaseURI + 'Affiliate/'+id);
    }
    getAffiliateById(id:any){
      return this.http.get(environment.BaseURI + 'Affiliate/GetById?id='+id);
    }
}
