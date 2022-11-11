import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserApiService } from '../servicesApi/user-api.service';
import { AuthorizationService } from '../servicesApi/authorization.service';
import { OrderApiService } from '../servicesApi/order-api.service';
import { CartService } from '../servicesApi/cart.service';
import { OrderProductApiService } from '../servicesApi/order-product-api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  allCartProducts:any[] = [];
  currentUserID: string;
  user: any = {} as any;

  constructor(private loc:Location,
    private router:Router,
    private userApi: UserApiService,
    private auth: AuthorizationService,
    private orderApi: OrderApiService,
    private cartApi: CartService,
    private orderProductApi: OrderProductApiService
  ){ }

  ngOnInit() {
    this.userApi.getUser(this.auth.getUserPayload().sub).subscribe(  (user)=>{
        this.user = user;
    })
    this.currentUserID = this.auth.getUserPayload().sub;

  }

  goPrevPage(){
    this.loc.back();
   }

   onCheckout(){ 

      let order:any = {
        userID: this.currentUserID
      }
      console.log("ASCE.......");

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
                        this.orderApi.editOrder( editedOrder._id, editedOrder).subscribe( (done)=>{
                          this.router.navigate(['/order-confirmation']);
                        } );

                    }
                }
            })
      })
  }

}
