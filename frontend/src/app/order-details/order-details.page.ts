import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorizationService } from '../servicesApi/authorization.service';
import { OrderProductApiService } from '../servicesApi/order-product-api.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  orderID:any;
  currentUserID:any;
  subtotal: number = 0;
  grandTotal:number = 0;

  orderProducts:any[] = [];


  constructor(
    private acr: ActivatedRoute,
    private loc:Location,
    private auth: AuthorizationService,
    private orderProductApi: OrderProductApiService
  ) { }

  ngOnInit() {
    this.acr.queryParams.subscribe( (res:any) => {
      this.orderID = res['id'];
      console.log(this.orderID);
    
    });
    this.currentUserID = this.auth.getUserPayload().sub;
    console.log("User ID: ", this.currentUserID);
  }

  goPrevPage(){
    this.loc.back();
  }

  ionViewWillEnter(){
    this.orderProducts.splice(0);
    this.subtotal = 0;
    this.grandTotal = 3;

    this.orderProductApi.getOrderProducts().subscribe( (response:any)=>{
          let allorderProducts:any[] = response.data;
          console.log("All Order Products:....", allorderProducts);
          for(let op of allorderProducts){
              if( op.userID == this.currentUserID && op.orderID == this.orderID){
                 console.log("Paice Success!!...");
                  this.orderProducts.push( op );
                  this.subtotal += +op.subtotal;
                  this.grandTotal += +op.subtotal;
              }
          }
          console.log(this.orderProducts);
     })
  }


}
