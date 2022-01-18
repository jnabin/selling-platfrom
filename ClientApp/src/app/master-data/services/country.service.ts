import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  getAll() {
    return this.http.get(environment.BaseURI + 'Country');
  }
  saveCountry(data: any) {
    debugger
    // var body = {
    //   Name: data.Name,
    //   Code: data.Code,
    //   Currency: data.Currency,
    //   CurrencyCode: data.CurrencyCode,
    //   iso2Code:data.iso2Code,
    //   iso3Code:data.iso3Code

    // }

    var body =  {
      iso2Code:data.iso2Code,
      iso3Code:data.iso3Code,
      countryName: data.countryName,
      currencyCode:data.currencyCode,
      currencyName: data.currencyName,
      currencySymbol:data.currencySymbol,
      callingCodesCSV: "test",
      flagURL: ""
    }
    return this.http.post(environment.BaseURI + 'Country', body);
  }
  updateCountry(data: any) {
    
    var body =  {
      CountryId: data.countryId,
      iso2Code:data.iso2Code,
      iso3Code:data.iso3Code,
      countryName: data.countryName,
      currencyCode:data.currencyCode,
      currencyName: data.currencyName,
      currencySymbol:data.currencySymbol,
      callingCodesCSV: "test",
      flagURL: ""
    }

    return this.http.put(environment.BaseURI + 'Country', body);
  }
  deleteCountry(id:any) {
    return this.http.delete(environment.BaseURI + 'Country/' + id);
  }
  // getAllCountries(){
  //   return this.http.get(environment.BaseURI + 'Country/GetAll');
  // }
  getCountryById(id: any) {
    return this.http.get(environment.BaseURI + 'Country/GetById?id=' + id);
  }
}
