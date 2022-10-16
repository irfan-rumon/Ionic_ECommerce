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

  constructor(private auth: AuthorizationService ,
    private router:Router,
    private menu: MenuController) { }

  ngOnInit() {
    
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
