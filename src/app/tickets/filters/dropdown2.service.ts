import { Dropdown2class } from './dropdown2class';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Dropdown2Service {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Dropdown2/', {headers});
  }
  Add(tags: Dropdown2class): Observable<Dropdown2class> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Dropdown2class>(this.base + '/Dropdown2/', tags, options);
  }

  delete(guid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/Dropdown2/' + guid);
  }
}
