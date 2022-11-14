import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/servicesApi/authorization.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  currentUser:any = {};
  isLogged:boolean;

  constructor(private auth: AuthorizationService ,
    private router:Router,
    private menu: MenuController) { }

  ngOnInit() {
      if( this.auth.isLoggedIn())this.isLogged = true;
      else this.isLogged = false;
  }

  logout(){
     this.auth.deleteToken();
     this.close();
     this.router.navigate(['/login']);
  }
  close(){
    this.menu.close();
  }

}
