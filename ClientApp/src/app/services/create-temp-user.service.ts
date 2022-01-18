import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CreateTempUserService {

  constructor(private http: HttpClient) {
    debugger
  }
  
  createTempUser(email: string) {
    debugger
    var body = {
      "Email": email
    };
    return this.http.post(environment.BaseURI + 'Account/RegisterTempUser', body);
  }
}
