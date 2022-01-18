import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ICouponDiscount } from '../coupon-discount/coupon-discount.component';

@Injectable({
  providedIn: 'root'
})
export class CouponDiscountService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  GetAll(){
    return this.http.get(environment.BaseURI + 'CouponDiscount');
    }
    saveCouponDiscount(data:any){
      
        var body={
          ProductId:data.productId ,
          ProductSubscriptionTypeId: data.productSubscriptionTypeId ,
          CouponCode: data.couponCode ,
          StartDateUTC: data.startDateUTC ,
          EndDateUTC: data.endDateUTC ,
          UsageLimit: data.usageLimit,
          DiscountPercent: data.discountPercent ,
          DiscountMessage: data.discountMessage , 
          Description: data.description
          
        }
        return this.http.post(environment.BaseURI + 'CouponDiscount',body);
    }
    updateCouponDiscount(data:ICouponDiscount){
      
        var body={
          CouponDiscountId:data.couponDiscountId,
          ProductId:data.productId ,
          ProductSubscriptionTypeId: data.productsubscriptionTypeId ,
          CouponCode: data.couponCode ,
          StartDateUTC: data.startDateUTC ,
          EndDateUTC: data.endDateUTC ,
          UsageLimit: data.usageLimit,
          DiscountPercent: data.discountPercent ,
          DiscountMessage: data.discountMessage , 
          Description: data.description
        }
        return this.http.put(environment.BaseURI + 'CouponDiscount',body);
    }
    deleteCouponDiscount(id:any){
      return this.http.delete(environment.BaseURI + 'CouponDiscount/'+id);
    }
    getCouponDiscountById(id:any){
      return this.http.get(environment.BaseURI + 'CouponDiscount/GetById?id='+id);
    }
}
