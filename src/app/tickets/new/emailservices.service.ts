import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Emailclass } from './emailclass';
@Injectable({
  providedIn: 'root'
})
export class EmailservicesService {
  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Email/', {headers});
  }

  getbyid(EGuid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Email/' + EGuid);
  }

  Add(Email: Emailclass): Observable<Emailclass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Emailclass>(this.base + '/Email/', Email, options);
  }

  delete(EGuid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/Email/' + EGuid);
  }

  update(Email: Emailclass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/Email/' + Email.EGuid, JSON.stringify(Email), {headers}
    );
  }
}

