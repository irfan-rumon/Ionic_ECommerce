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
export class ProductApiService {

  private apiUrl:any = environment.baseApi + '/products';  
  

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
      console.log(this.apiUrl);

    return this.http.get<any>(this.apiUrl);
  }



  getProduct(prId: any): Observable<any> {
    const url = `${this.apiUrl}/${prId}`;
    return this.http.get<any>(url);
  }

  addProduct(pr: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pr, httpOptions);
  }

  editProduct( id:any, data:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data, httpOptions);
  }

  deleteProduct(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
