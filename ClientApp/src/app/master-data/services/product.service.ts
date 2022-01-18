import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  GetAll(){
    return this.http.get(environment.BaseURI + 'Product');
    }
  //   getProductsSmall() {
  //     return this.http.get<any>(environment.BaseURI + 'Product')
  //     .toPromise()
  //     .then(res => <any>res.data)
  //     .then(data => { 
  //       
  //       return data;
  //      });
  // }
    saveProduct(data:any){
      
        var body={
          Name:data.name,
          Description:data.description,
          IsActive:true
        }
        return this.http.post(environment.BaseURI + 'Product',body);
    }
    updateProduct(data:any){
        var body={
          ProductId : parseInt(data.productId),
          Name:data.name,
          Description:data.description,
          IsActive:true
        }
        return this.http.put(environment.BaseURI + 'Product',body);
    }
    deleteProduct(id:any){
      
      return this.http.delete(environment.BaseURI + 'Product/'+id);
    }
    getProductById(id:any){
      return this.http.get(environment.BaseURI + 'Product/GetById?id='+id);
    }
}
