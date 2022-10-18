import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserApiService } from '../servicesApi/user-api.service';
import { AuthorizationService } from '../servicesApi/authorization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:any = {};

  constructor(
    private loc:Location,
    private userApi: UserApiService,
    private auth: AuthorizationService
  ) { }

  ngOnInit() {
    this.userApi.getUser(this.auth.getUserPayload().sub).subscribe( (resUser)=>{
       this.user = resUser;
    })
  }

  goPrevPage(){
    this.loc.back();
  }

}
