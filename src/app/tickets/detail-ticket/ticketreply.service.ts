import { environment } from 'src/environments/environment.prod';
import { TicketforwardClass } from './ticketforwardclass';
import { TicketreplyClass } from './ticketreplyclass';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketreplyService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/TicketReply/', {headers});
  }

  getbyid(guid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/TicketReply/' + guid);
  }

  Add(ticketreply: TicketreplyClass): Observable<TicketreplyClass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<TicketreplyClass>(this.base + '/TicketReply/', ticketreply, options);
  }

  delete(guid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/TicketReply/' + guid);
  }

  update(ticketreply: TicketreplyClass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/TicketReply/' + ticketreply.ReplyGuid, JSON.stringify(ticketreply), {headers}
    );
  }

  getforward(ticketforward: TicketforwardClass): Observable<TicketforwardClass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<TicketforwardClass>(this.base + '/Mail/', ticketforward, options);
  }
}
