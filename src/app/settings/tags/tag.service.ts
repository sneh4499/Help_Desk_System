import { environment } from './../../../environments/environment.prod';
import { Tagclass } from './tagclass';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TagService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/tag/', {headers});
  }

  getbyid(guid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/tag/' + guid);
  }

  Add(tags: Tagclass): Observable<Tagclass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Tagclass>(this.base + '/tag/', tags, options);
  }

  delete(guid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/tag/' + guid);
  }

  update(tags: Tagclass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/tag/' + tags.TagGuid, JSON.stringify(tags), {headers}
    );
  }
}
