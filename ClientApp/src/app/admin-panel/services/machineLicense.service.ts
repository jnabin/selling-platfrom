import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MachineLicense {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
    getMachineLicense(id:any){
    return this.http.get(environment.BaseURI + 'LicenseMachine/GetByLicenseId?id='+id);
    }
    deleteMachineLicense(id:any){
      return this.http.delete(environment.BaseURI + 'LicenseMachine/'+id);
      }
}
