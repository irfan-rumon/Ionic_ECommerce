import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from 'src/app/servicesApi/product-api.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  params: string = "";
  currentProduct: any = {};
  toggle:boolean = false;
  buynow:boolean = false;
  quantity: number = 1;
  subtotal: number = 0;

  constructor(private acr: ActivatedRoute,
    private prd:  ProductApiService) { }

  ngOnInit() {
   
    this.acr.queryParams.subscribe(res => {
      this.params = res['id'];

      this.prd.getProduct(this.params).subscribe( (response)=>{
            this.currentProduct = response;
           
            this.subtotal = +this.currentProduct.unitPrice * this.quantity;
           
      })
      
    });
   
  }
 
  onRemoveQt(){
     if( this.quantity == 1)return;
     this.quantity--;
     this.subtotal = this.quantity * this.currentProduct.unitPrice;
  }

  onAddQt(){
    this.quantity++;
    this.subtotal = this.quantity * this.currentProduct.unitPrice;
  }

}