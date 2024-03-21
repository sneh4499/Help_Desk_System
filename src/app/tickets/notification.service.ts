import { environment } from './../../environments/environment.prod';
import { Notificationclass } from './notificationclass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contactclass } from '../tickets/new/Contactclass';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Notification/', {headers});
  }

  getbyid(Nguid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Notification/' + Nguid);
  }

  Add(noti: Notificationclass): Observable<Notificationclass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Notificationclass>(this.base + '/Notification/', noti, options);
  }

  delete(Nguid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/Notification/' + Nguid);
  }

  update(noti: Notificationclass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/Notification/' + noti.Nguid, JSON.stringify(noti), {headers}
    );
  }
}

