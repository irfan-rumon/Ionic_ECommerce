import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private apiUrl = environment.baseApi + ' /users';
  private loginUrl = environment.baseApi + '/authentication';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUser(userId: any):Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user, httpOptions);
  }

  logUser(user:any):Observable<any>{
    return this.http.post<any>(this.loginUrl,  user, httpOptions);
  }
}