import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserApiService } from '../servicesApi/user-api.service';
import { AuthorizationService } from '../servicesApi/authorization.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  delivery:string;
  city:string;
  zipcode:string;

  constructor(private loc:Location,
       private router:Router,
       private userApi: UserApiService,
       private auth: AuthorizationService
    ) { }

  ngOnInit() {
     this.userApi.getUser(this.auth.getUserPayload().sub).subscribe(  (user)=>{
        this.delivery = user.address;
        this.city = "Dhaka";
        this.zipcode = "1216";
     } )
  }

  goPrevPage(){
   this.loc.back();
  }

  onCheckout(){
   this.router.navigate(['/checkout']);
  }

}
