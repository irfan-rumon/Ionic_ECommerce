import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../servicesApi/authorization.service';
import { CartService } from '../servicesApi/cart.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  allCartProducts:any[] = [];
  currentUserID: string;
  cardName: string;
  cardNumber: string;
  cartID: string;

  constructor(
    private router: Router,
    private loc: Location,
    private auth: AuthorizationService,
    private cartApi: CartService,
  
  ) { }

  ngOnInit() {
     this.currentUserID = this.auth.getUserPayload().sub;
  }  

  goPrevPage(){
    this.loc.back();
  }

  onCheckout(){ 
      this.cartApi.getCartProducts().subscribe( res=>{
        this.allCartProducts = res.data;
        for(let cp of this.allCartProducts){
             if( cp.userID == this.currentUserID){
                  let updatedCP = {...cp};
                  updatedCP.status = "Confirmed";
                  this.cartApi.editCartProduct(cp._id, updatedCP).subscribe();          
             }
        }
        this.router.navigate(['/myorder']);

      })
  };

}
      
    



