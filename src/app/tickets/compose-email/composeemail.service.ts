import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { ComposeEmailComponent } from './compose-email.component';

@Injectable({
  providedIn: 'root'
})
export class ComposeemailService {

  guid = '49caa72d-59d7-49d2-b8fe-88687e9d21e0';
  base = 'https://localhost:44301/api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/ComposeEmailComponent/', {headers});
  }

  getbyid(guid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/ComposeEmailComponent/' + guid);
  }

  Add(ComposeEmailComponent: ComposeEmailComponent): Observable<ComposeEmailComponent> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<ComposeEmailComponent>(this.base + '/ComposeEmailComponent/', ComposeEmailComponent, options);
  }

  delete(guid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/ComposeEmailComponent/' + guid);
  }

  update(ComposeEmailComponent: ComposeEmailComponent)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    // tslint:disable-next-line: max-line-length
    return this.http.put(this.base + '/ComposeEmailComponent/' + ComposeEmailComponent.guid, JSON.stringify(ComposeEmailComponent), {headers}
    );
  }
}
