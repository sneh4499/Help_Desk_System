import { environment } from './../../environments/environment.prod';
import { Loginclass } from './loginclass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contactclass } from '../tickets/new/Contactclass';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Auth/', {headers});
  }

  getbyid(lGuid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Auth/' + lGuid);
  }

  Add(login: Loginclass): Observable<Loginclass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Loginclass>(this.base + '/Auth/', login, options);
  }

  delete(Lguid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/Auth/' + Lguid);
  }

  update(login: Loginclass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/Auth/' + login.Lguid, JSON.stringify(login), {headers}
    );
  }
}

