import { environment } from './../../../environments/environment.prod';
import { BussinesshoursClass } from './bussinesshoursclass';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BussinesshoursService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/BussinessHours/', {headers});
  }

  getbyid(guid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/BussinessHours/' + guid);
  }

  Add(bussiness: BussinesshoursClass): Observable<BussinesshoursClass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<BussinesshoursClass>(this.base + '/BussinessHours/', bussiness, options);
  }

  delete(guid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/BussinessHours/' + guid);
  }

  update(bussiness: BussinesshoursClass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/BussinessHours/' + bussiness.BussinessGuid, JSON.stringify(bussiness), {headers}
    );bussiness
  }
  authenticate(email: string, password: string) {
    // const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/BussinessHours/' + email + ',' + password);
  }
}
