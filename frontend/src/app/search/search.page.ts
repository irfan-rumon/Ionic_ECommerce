import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductApiService } from '../servicesApi/product-api.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchedProduct: string;
  products: any[] = [];

  constructor(
      private router:Router,
      private acr: ActivatedRoute,
      private loc: Location,
      private productApi: ProductApiService
  ) { }

  ngOnInit() {
    this.acr.queryParams.subscribe(res => {
      this.searchedProduct = res['name'];
      this.searchedProduct = this.searchedProduct.charAt(0).toUpperCase() + this.searchedProduct.slice(1).toLowerCase();
      console.log('User wanted', this.searchedProduct);
    });
    this.productApi.getProducts().subscribe(  (response)=>{
        let allProducts:any[] = response.data;
        for(let pr of allProducts){
           if( pr.name.includes( this.searchedProduct))this.products.push( pr );
           if( pr.catagory.includes( this.searchedProduct))this.products.push( pr );
        }
        console.log("Paici", this.products);
    })

  }

  
  goPrevPage(){
    this.loc.back();
  }

  reLoadPage(){
      this.products = [];
      this.ngOnInit();
  }


}
