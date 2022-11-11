import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../servicesApi/user-api.service';
import { User } from '../models/user';
import { CartService } from '../servicesApi/cart.service';
import { Location } from '@angular/common';
import { OrderApiService } from '../servicesApi/order-api.service';
import { OrderProductApiService } from '../servicesApi/order-product-api.service';
import { AlertController } from '@ionic/angular';
import { LoggerUser } from '../models/loggerUser';
import { AuthorizationService } from 'src/app/servicesApi/authorization.service';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  allCartProducts:any[] = [];
  currentUserID: string;
  dist:string;

  user: any = {} as any;

  constructor(private loc:Location,
       private router:Router,
       private userApi: UserApiService,
       private auth: AuthorizationService,
       private orderApi: OrderApiService,
       private cartApi: CartService,
       private orderProductApi: OrderProductApiService,
  
    ) { }

  ngOnInit() {
     this.userApi.getUser(this.auth.getUserPayload().sub).subscribe(  (user)=>{
        this.user = user;
     })
     this.currentUserID = this.auth.getToken();
  }

  showDist(){
     console.log(this.dist); 
  }

  goPrevPage(){
   this.loc.back();
  }


  onSubmit(){
    this.router.navigate(['/payment']); 
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
                      this.orderApi.editOrder( editedOrder._id, editedOrder).subscribe( (done)=>{
                        this.router.navigate(['/order-confirmation']);
                      } );

                  }
              }
          } )
    } )
  }


}
