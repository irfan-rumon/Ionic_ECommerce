import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})

export class CustomerApiService {

  private apiUrl = 'http://localhost:3030/anys';

  constructor(private http: HttpClient) { }

  getanys(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getany(anyId: any):Observable<any> {
    const url = `${this.apiUrl}/${anyId}`;
    return this.http.get<any>(url);
  }

  addany(any: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, any, httpOptions);
  }

  editany(id: any, data:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data, httpOptions);
  }
}
