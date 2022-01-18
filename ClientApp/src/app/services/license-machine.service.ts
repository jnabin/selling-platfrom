import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LicenseMachineService {

  constructor(private http: HttpClient) { }

  getAllLicenseMachine(id: number) {
    debugger
    return this.http.get(environment.BaseURI + "LicenseMachine/GetAllByLicenseId/"+id);
  }

  deleteLicenseMachine(id: number) {
    debugger
    return this.http.delete(environment.BaseURI + "LicenseMachine/" + id);
  }

}
