import { Dropdown1class } from './dropdown1class';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Dropdown1Service {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Dropdown1/', {headers});
  }
  Add(tags: Dropdown1class): Observable<Dropdown1class> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Dropdown1class>(this.base + '/Dropdown1/', tags, options);
  }

  delete(guid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/Dropdown1/' + guid);
  }
}
