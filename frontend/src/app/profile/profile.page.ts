import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserApiService } from '../servicesApi/user-api.service';
import { AuthorizationService } from '../servicesApi/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:any = {};
  isLogged:boolean;

  constructor(
    private loc:Location,
    private userApi: UserApiService,
    private auth: AuthorizationService,
    private router: Router
  ) {
            console.log("Hetttt");
            if( localStorage.getItem('token') )this.isLogged = true;
            else {
                this.isLogged = false;
                this.router.navigate(['/login']); 
            }

   }

  ngOnInit() {
    console.log("Hetttt cons");
    if( localStorage.getItem('token') ){
      this.isLogged = true;
      this.userApi.getUser(this.auth.getUserPayload().sub).subscribe( (resUser)=>{
        this.user = resUser;
     })
    }
    else {
        this.isLogged = false;
        this.router.navigate(['/login']); 
    }

  
  }

  goPrevPage(){
         this.loc.back();
  }

}




