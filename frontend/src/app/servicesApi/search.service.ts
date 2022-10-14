import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  products: any[];

  constructor() { }

  

  setProducts(products: any[]){
    this.products = products;
  }

  getProducts(){
    return this.products;
  }

}
