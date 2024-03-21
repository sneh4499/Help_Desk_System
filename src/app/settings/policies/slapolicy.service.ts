import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { SlapolicyClass } from './slapolicyclass';


@Injectable({
  providedIn: 'root'
})
export class SlapolicyService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/SlaPolicy/', {headers});
  }

  getbyid(guid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/SlaPolicy/' + guid);
  }
  update(sla: SlapolicyClass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/SlaPolicy/' + sla.SlaGuid, JSON.stringify(sla), {headers}
    );
  }
}
