import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { HelpdeskClass } from './helpdeskclass';

@Injectable({
  providedIn: 'root'
})
export class HelpdeskService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }

  getbyid(guid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Systemsetting/' + guid);
  }

  update(heldesk: HelpdeskClass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/Systemsetting/' + heldesk.Sguid, JSON.stringify(heldesk), {headers}
    );
  }
}
