import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Customer } from './customer';


@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) { }

    getAllLicense():Observable<Customer>{
        return this.http.get(environment.BaseURI+"License")
    }

    //getCustomersLarge() {
    //    return this.http.get<any>('assets/customers-large.json')
    //        .toPromise()
    //        .then(res => <Customer[]>res.data)
    //        .then(data => { return data; });
    //}
}
