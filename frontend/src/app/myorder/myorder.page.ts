import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderApiService } from '../servicesApi/order-api.service';
import { OrderProductApiService } from '../servicesApi/order-product-api.service';
import { AuthorizationService } from '../servicesApi/authorization.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
})
export class MyorderPage implements OnInit {

  currentUserID: string;
 
  orders: any[] = [];
 

  constructor(
    private router:Router,
    private orderApi: OrderApiService,
    private OrderProductApi: OrderProductApiService,
    private loc: Location,
    private auth: AuthorizationService
  ) { }

  ngOnInit() {
   
  }

  goPrevPage(){
    this.loc.back();
  }


 

  ionViewWillEnter(){
   
    this.orders.splice(0);
    this.currentUserID = this.auth.getUserPayload().sub;
      

    this.orderApi.getOrders().subscribe(  (resOrders:any)=>{
       let allOrders:any[] = resOrders.data;
       for(let order of allOrders){
          if( order.userID == this.currentUserID){
            this.orders.push( order );
          }
       }
    })


  }

 

}