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

  carts:any[] = [];

  constructor(
    private router:Router,
    private cartApi: CartService,
    private auth: AuthorizationService
  ) { }

  ngOnInit() {
    this.cartApi.getCartProducts().subscribe( (response:any)=>{
        let allCartProducts: any[] = response.data;
        for(let cp of allCartProducts){
            if( cp.userID == this.auth.getUserPayload().sub)
                this.carts.push(cp);
        }
        console.log(this.carts);
    })   

  }

}
