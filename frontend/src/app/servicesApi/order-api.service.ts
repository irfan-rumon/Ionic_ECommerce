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
export class OrderApiService {

  private apiUrl = 'http://localhost:3030/orders';
 

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }


  addOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order, httpOptions);
  }

  editOrder( orderId:string, order:any): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.put<any>(url, order, httpOptions);
  }

 
}