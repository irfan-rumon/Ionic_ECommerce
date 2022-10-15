import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../servicesApi/cart.service';
import { AuthorizationService } from '../servicesApi/authorization.service';
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
})
export class MyorderPage implements OnInit {

  currentUserID: string;
  allCartProducts: any[] = [];
  orderProducts: any[] = [];
  total:number = 0;
  shipping: number = 3;
  grandTotal: number = 3;

  constructor(
    private router:Router,
    private cartApi: CartService,
    private auth: AuthorizationService
  ) { }

  ngOnInit() {
      this.currentUserID = this.auth.getUserPayload().sub;
      this.cartApi.getCartProducts().subscribe( res=>{
          this.allCartProducts = res.data;
          for(let cp of this.allCartProducts){
              if( cp.userID == this.currentUserID && cp.status == "Confirmed"){
                  this.orderProducts.push(cp);
                  this.total += +cp.subtotal;
                  this.grandTotal += +cp.subtotal;
              }
          }
      })
  }

}
