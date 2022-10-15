import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../servicesApi/user-api.service';
import { AuthorizationService } from '../servicesApi/authorization.service';
import { CartService } from '../servicesApi/cart.service';
import { OrderApiService } from '../servicesApi/order-api.service';
import { ActivatedRoute } from '@angular/router';

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
    private auth: AuthorizationService,
    private acr:ActivatedRoute,
    private cartApi: CartService,
    private userApi: UserApiService
  ) { }

  ngOnInit() {
     this.currentUserID = this.auth.getUserPayload().sub;
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
      
    



