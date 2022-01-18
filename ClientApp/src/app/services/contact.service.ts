import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get(environment.BaseURI + 'Contact');
  }

  Create(item: any) {
    return this.http.post(environment.BaseURI + 'Contact', item);
  }
  CloseTicket(id: any) {
    return this.http.put(environment.BaseURI + 'Contact/CloseTicket/' + id,null);
  }
}
