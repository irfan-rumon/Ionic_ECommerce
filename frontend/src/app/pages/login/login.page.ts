import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class LoginPage implements OnInit, OnDestroy {

 
  user: LoggerUser = {} as LoggerUser;

   failedLogin:boolean = false;

  constructor(private auth:  AuthorizationService,
              private userApi: UserApiService,
              private loc: Location,
              private router: Router) { }
 
  ngOnInit() {
    this.user.email = '';
    this.user.password = '';
    this.failedLogin= false;
  }

  ngOnDestroy(){
    this.user.email = '';
    this.user.password = '';
    this.failedLogin= false;
  }
  ngOnViewChange(){
    this.user.email = '';
    this.user.password = '';
    this.failedLogin= false; 
  }
 
  onLogin(){
  
      this.user.strategy = "local";
      this.userApi.logUser(this.user).subscribe(   (response)=>{   
          this.auth.setToken(response["accessToken"]);    
          this.user.email = '';
          this.user.password = '';  
          this.router.navigate(['/home']);                               
      }, (err)=>{
         this.failedLogin = true;
      })
  }

  goPrevPage(){
      this.loc.back();
  }

}
