import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Ticketclass } from './ticketclass';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class NewticketservicesService {
  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Ticket/', {headers});
  }

  getbyid(TGuid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Ticket/' + TGuid);
  }

  Add(Ticket: Ticketclass): Observable<Ticketclass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Ticketclass>(this.base + '/Ticket/', Ticket, options);
  }

  delete(TGuid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/Ticket/' + TGuid);
  }

  update(Ticket: Ticketclass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/Ticket/' + Ticket.TGuid, JSON.stringify(Ticket), {headers}
    );
  }

  getbyagentid(AGuid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/StatuswiseTicket/' + AGuid);
  }
}

