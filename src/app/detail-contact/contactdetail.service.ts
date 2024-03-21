import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contactclass } from '../tickets/new/Contactclass';

@Injectable({
  providedIn: 'root'
})
export class ContactdetailService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/detail-contact/', {headers});
  }

  getbyid(ConGuid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/detail-contact/' + ConGuid);
  }

  Add(Contact: Contactclass): Observable<Contactclass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Contactclass>(this.base + '/detail-contact/', Contact, options);
  }

  delete(ConGuid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/detail-contact/' + ConGuid);
  }

  update(Contact: Contactclass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/detail-contact/' + Contact.ConGuid, JSON.stringify(Contact), {headers}
    );
  }
}

