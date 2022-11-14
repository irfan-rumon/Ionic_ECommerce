import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/servicesApi/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogged:boolean;

  constructor(private auth:AuthorizationService) { }

  ngOnInit() {
    if( this.auth.isLoggedIn( ) )this.isLogged = true;
    else this.isLogged = false;
  }

}
