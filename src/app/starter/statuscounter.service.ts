import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contactclass } from '../tickets/new/Contactclass';

@Injectable({
  providedIn: 'root'
})
export class StatuscounterService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/StatuswiseTicket/', {headers});
  }

  getbyid(status: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/StatuswiseTicket/Get/' + status);
  }
}

