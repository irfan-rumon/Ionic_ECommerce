import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private loc:Location) { }

  ngOnInit() {
  }

  goPrevPage(){
    this.loc.back();
   }

}
