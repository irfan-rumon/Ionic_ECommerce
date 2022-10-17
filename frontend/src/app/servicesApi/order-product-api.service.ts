import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class OrderProductApiService {

  private apiUrl = 'http://localhost:3030/order-products';


  constructor(private http: HttpClient) { }

  getOrderProducts(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  getProduct(orderId: any): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.get<any>(url);
  }

  addOrderProduct(op: any):any {
    return this.http.post<any>(this.apiUrl, op);
  }

  editOrderProduct(id: any, op:any):any {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, op, httpOptions);
  }

  deleteOrderProduct(op:any):any {
    const url = `${this.apiUrl}/${op._id}`;
    return this.http.delete<any>(url);
  }


}
