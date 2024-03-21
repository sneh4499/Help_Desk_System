import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Contactclass } from './Contactclass';
@Injectable({
  providedIn: 'root'
})
export class NewcontactservicesService {
  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Contact/', {headers});
  }

  getbyid(ConGuid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Contact/' + ConGuid);
  }

  Add(Contact: Contactclass): Observable<Contactclass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Contactclass>(this.base + '/Contact/', Contact, options);
  }

  delete(ConGuid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/Contact/' + ConGuid);
  }

  update(Contact: Contactclass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/Contact/' + Contact.ConGuid, JSON.stringify(Contact), {headers}
    );
  }
}

