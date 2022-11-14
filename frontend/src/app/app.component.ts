import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 isLogged:boolean;

  constructor( ) {
     // if( this.auth.isLoggedIn())this.isLogged = true;
      //else this.isLogged = false;
   
  }


}
