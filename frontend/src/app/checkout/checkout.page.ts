import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../servicesApi/authorization.service';
import { CartService } from '../servicesApi/cart.service';
import { Location } from '@angular/common';
import { OrderApiService } from '../servicesApi/order-api.service';
import { OrderProductApiService } from '../servicesApi/order-product-api.service';


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
    private orderApi: OrderApiService,
    private cartApi: CartService,
    private orderProductApi: OrderProductApiService
  
  ) { }

  ngOnInit() {
     this.currentUserID = this.auth.getUserPayload().sub;
  }  

  goPrevPage(){
    this.loc.back();
  }

  onCheckout(){ 

    let order:any = {
      userID: this.currentUserID
    }

    this.orderApi.addOrder(order).subscribe( (addedOrder)=>{
          let tmpTotal:number = 0; let grandTotal: number = 0;
          this.cartApi.getCartProducts().subscribe( (carts)=>{
              let allCarts: any[] = carts.data;
              for(let cart of allCarts){
                  if( cart.userID == this.currentUserID){
                      tmpTotal += +cart.subtotal;
                      grandTotal += +cart.subtotal;
                      let orderProduct:any = {...cart};
                      orderProduct.orderID = addedOrder._id;
                    
                      this.orderProductApi.addOrderProduct(orderProduct).subscribe( (op:any)=>{
                             
                              this.cartApi.deleteCartProduct(cart).subscribe( (response:any)=>{
                                
                              })

                      })

                      let editedOrder: any = {...addedOrder};
                      editedOrder.total = tmpTotal;
                      editedOrder.grandTotal = tmpTotal + 3;
                      editedOrder.shipping = 3;
                      this.orderApi.editOrder( editedOrder._id, editedOrder).subscribe( (done)=>{} );

                  }
              }
          } )
    } )
  };

}
      
    



