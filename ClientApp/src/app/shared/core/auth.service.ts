import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject } from 'rxjs';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject = new Subject<string>();
  helper = new JwtHelperService();
  private url: string = 'api/auth';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public redirectUrl: any;

  constructor(private http: HttpClient, private router: Router) { }

  getAuthorizationToken() {
    return 'some-auth-token';
  }
  getToken() {
    return localStorage.getItem("token");
  }
  getRole() {
    return localStorage.getItem("roleName");
  }

  setToken(token: string): void {
    localStorage.setItem("TOKEN_NAME", token);
  }
  getMessage(): Observable<string>{
    return this.subject.asObservable();
  }
  nextMessage(message: string){
    this.subject.next(message);
  }
  isAuthenticated():any {
    if (localStorage.getItem("token") == null) {
      return false;
    }
    else
    {
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = null;
      }
      return true;
    }
    //  var token = localStorage.getItem("token")==null?null:localStorage.getItem("token");
    //return this.helper.isTokenExpired(token) ?false:true;
  }
  clearLocalStorage(){
    localStorage.removeItem("token");
    localStorage.removeItem("roleName");
    this.nextMessage("");
  }
}
