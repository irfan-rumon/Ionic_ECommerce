import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from 'src/app/servicesApi/product-api.service';
import {AuthorizationService} from 'src/app/servicesApi/authorization.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/servicesApi/cart.service';
import { Location } from '@angular/common';

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
  cartNum: number = 0;

  constructor(private acr: ActivatedRoute,
    private prd:  ProductApiService,
    private router: Router,
    private loc: Location,
    private cartApi: CartService,
    private auth: AuthorizationService) { }

  ngOnInit() {

    this.cartApi.getCartProducts().subscribe( (allCarts)=>{
          let allCartsArr: any[] = allCarts.data;
          for(let cart of allCartsArr){
            if( cart.userID == this.auth.getUserPayload().sub)
                this.cartNum += +cart.quantity;
          }
        })
   
    this.acr.queryParams.subscribe(res => {
      this.params = res['id'];

      this.prd.getProduct(this.params).subscribe( (response)=>{
            this.currentProduct = response;
           
            this.subtotal = +this.currentProduct.unitPrice * this.quantity;
           
      })
      
    });
   
  }

  goPrevPage(){
    this.loc.back();
  }
 
  onCart(){
    console.log("Cart e entered!!");
    if( !this.auth.isLoggedIn() ){
        this.router.navigate(['/login']);
        return;
    }
    else{
            console.log("Ai j ekhane...");
            let newCartProduct = {} as any;

            newCartProduct.userID = this.auth.getUserPayload().sub; 
            newCartProduct.brand=this.currentProduct.brand;
            newCartProduct.name=this.currentProduct.name;  
            newCartProduct.imageURL=this.currentProduct.imageURL;
            newCartProduct.unitPrice=this.currentProduct.unitPrice;
            newCartProduct.quantity=this.quantity;
            newCartProduct.subtotal=this.subtotal;
            newCartProduct.productID = this.currentProduct._id; 

            this.cartApi.addCartProduct( newCartProduct  ).subscribe( (response)=>{
                //this.router.navigate(['/home']);
                this.cartNum += newCartProduct.quantity;
            });
    }      
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