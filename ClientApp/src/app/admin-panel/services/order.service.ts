import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  GetAll() {
    return this.http.get(environment.BaseURI + "Order");
  }
}
