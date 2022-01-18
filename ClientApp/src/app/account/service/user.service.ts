import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }

    registerUser = this.fb.group({
      UserId: 0,
      FirstName: [''],
      LastName: [''],
      Email: [''],
      VerificationGuid: [''],
      PhoneNumber: [''],
      CompanyName: [''],
      PasswordHash: [''],
      PasswordDate: [''],
      Enabled: [''],
      Expired: ['']
    });

    login(email:any,password:any){
    const body = {
      Email: email,
      Password: password,
    };
    return this.http.post(environment.BaseURI + 'Account/authenticate', body);
    }
    
    register(userRegister:any){
    const body = {
      UserId:0,
      FirstName: userRegister.firstName,
      LastName: userRegister.lastName,
      PasswordHash: userRegister.password,
      PhoneNumber: userRegister.phoneNumber,
      Email: userRegister.email,
      Company: userRegister.company,
      RoleId:2
    };
    return this.http.post(environment.BaseURI + 'Account/Register', body);
  }
  changePassword(user: any) {
    debugger
    return this.http.post(environment.BaseURI + 'Account/ChangePassword', user);
  }
  forgotPassword(user: any) {
    debugger
    return this.http.post(environment.BaseURI + 'Account/ForgotPassword', user);
  }

  Activate(id: string) {
    return this.http.get(environment.BaseURI + 'Account/Activate/'+id);
  }

}
