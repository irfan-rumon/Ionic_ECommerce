import { Component, OnInit } from '@angular/core';
import { LoggerUser } from 'src/app/models/loggerUser';
import { AuthorizationService } from 'src/app/servicesApi/authorization.service';
import { UserApiService } from 'src/app/servicesApi/user-api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: LoggerUser = {} as LoggerUser;

  constructor(private auth:  AuthorizationService,
              private userApi: UserApiService,
              private loc: Location,
              private router: Router) { }
 
  ngOnInit() {
   
   
  }
 
  onLogin(){
  
      this.user.strategy = "local";
      this.userApi.logUser(this.user).subscribe(   (response)=>{   
          this.auth.setToken(response["accessToken"]);        
          this.router.navigate(['/home']);                               
      }, (err)=>{
         console.log("Error!!!");
      })
  }

  goPrevPage(){
      this.loc.back();
  }

}
