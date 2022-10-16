import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../servicesApi/authorization.service';
import { UserApiService } from '../servicesApi/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthorizationService,
               private userApi: UserApiService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
       if( !this.auth.isLoggedIn()  )
       {
         this.router.navigate(['/login']);
         this.auth.deleteToken();
         return false;
       }
       else{
           return true;
       }
      
  }
  
}
