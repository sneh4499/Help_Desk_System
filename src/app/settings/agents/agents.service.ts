import { environment } from 'src/environments/environment.prod';
import { AgentClass } from './agentclass';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Agent/', {headers});
  }

  getbyid(guid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Agent/' + guid);
  }

  Add(agent: AgentClass): Observable<AgentClass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<AgentClass>(this.base + '/Agent/', agent, options);
  }

  delete(guid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/Agent/' + guid);
  }

  update(agent: AgentClass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/Agent/' + agent.AgGuid, JSON.stringify(agent), {headers}
    );
  }
  authenticate(email: string, password: string) {
    // const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Auth/' + email + ',' + password);
  }
}
