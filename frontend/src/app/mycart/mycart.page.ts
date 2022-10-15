import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../servicesApi/authorization.service';
import { CartService } from '../servicesApi/cart.service';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.page.html',
  styleUrls: ['./mycart.page.scss'],
})
export class MycartPage implements OnInit {

  cartID: string;
  total: number = 0;
  shipping: number = 3;
  grandTotal: number = 3;

  carts:any[] = [];

  constructor(
    private router:Router,
    private cartApi: CartService,
    private auth: AuthorizationService
  ) { }

  ngOnInit() {
    this.cartApi.getCartProducts().subscribe( (response:any)=>{
        let allcarts: any[] = response.data;
        for(let cp of allcarts){
            if( cp.userID == this.auth.getUserPayload().sub){
                this.cartID = cp._id;
                this.carts.push(cp);
                this.total += +cp.subtotal;
                this.grandTotal += +cp.subtotal;
            }
        }
        console.log(this.carts);
    })   

  }

  addQuantity(cartProduct:any){
   
    for(let cp  of this.carts){
      if(cp._id == cartProduct._id){ 
          cp.quantity++;
          cp.subtotal = +cp.unitPrice  +  +cp.subtotal;
          this.total += +cp.unitPrice;
          this.grandTotal += +cp.unitPrice;  
          this. cartApi.editCartProduct(cartProduct._id, cp).subscribe(); 
        
          return; 
      }
    }
  }

  minusQuantity(cartProduct:any){
    if( cartProduct.quantity == 1){
        this.deleteCartProduct(cartProduct);
        return;
    }

    for(let cp  of this.carts){
      if(cp._id == cartProduct._id){ 
          cp.quantity--;
          cp.subtotal =  +cp.subtotal -  +cp.unitPrice;  
          this.total -= +cp.unitPrice;
          this.grandTotal -= +cp.unitPrice;
          this.cartApi.editCartProduct(cartProduct._id, cp).subscribe(); 
          return; 
      }
    }

  }

  deleteCartProduct(cartProduct:any){
    
      this.total -= +cartProduct.subtotal;
      this.grandTotal -= +cartProduct.subtotal;
     

      this.cartApi.deleteCartProduct(cartProduct).subscribe(); //external server theke delete
      const indexOfObject = this.carts.findIndex((object) => {
        return object === cartProduct;
      });  
      this.carts.splice(indexOfObject, 1);//internal array theke delete*/
  }

 

}
