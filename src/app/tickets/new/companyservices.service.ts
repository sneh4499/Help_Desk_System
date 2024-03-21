import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Companyclass } from './companyclass';

@Injectable({
  providedIn: 'root'
})
export class CompanyservicesService {
  base = environment.baseUrl + 'api';
  constructor(private http: HttpClient) { }
  get() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Company/', {headers});
  }

  getbyid(ComGuid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/Company/' + ComGuid);
  }

  Add(Company: Companyclass): Observable<Companyclass> {
    const httpheaders = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post<Companyclass>(this.base + '/Company/', Company, options);
  }

  delete(ComGuid: any){
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.base + '/Company/' + ComGuid);
  }

  update(Company: Companyclass)   {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.base + '/Company/' + Company.ComGuid, JSON.stringify(Company), {headers}
    );
  }

  getbycompanyid(ComGuid: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(this.base + '/CompanyDetail/' + ComGuid);
  }
}

