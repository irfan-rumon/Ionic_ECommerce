import { Component, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/servicesApi/user-api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Location } from '@angular/common';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user:User = {} as User;
  passNotMatched: boolean = false;
 
  constructor(private router: Router, 
    private loc: Location,
    private userApi: UserApiService) { }

  ngOnInit() {
   
  }

  goPrevPage(){
    this.loc.back();
  }

  onSubmit(){
    if( this.user.password != this.user.passConfirm)
    {
       this.passNotMatched = true;      
       return;
    }

    this.userApi.addUser(this.user).subscribe( (addedUser)=>{
          console.log("AddedUser");
          this.router.navigate(['/login']);
    })
  };
    

}
