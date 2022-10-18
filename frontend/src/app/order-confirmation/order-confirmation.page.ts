import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  constructor(private router:Router,
              private loc:Location) { }

  ngOnInit() {
  }

  goPrevPage(){
    this.loc.back();
  }

  cancelSuccess(){
    this.router.navigate(['/home']);
  }

}
