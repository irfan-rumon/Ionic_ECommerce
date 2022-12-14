import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'home',
   // canActivate: [UserGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
   /* children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
      
      {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)

      }
    ]*/
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'details',
   // canActivate: [UserGuard],
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'search',
   // canActivate: [UserGuard],
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'mycart',
   // canActivate: [UserGuard],
    loadChildren: () => import('./mycart/mycart.module').then( m => m.MycartPageModule)
  },
  {
    path: 'checkout',
   // canActivate: [UserGuard],
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'myorder',
    //canActivate: [UserGuard],
    loadChildren: () => import('./myorder/myorder.module').then( m => m.MyorderPageModule)
  },
  {
    path: 'profile',
    //canActivate: [UserGuard],
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'order-confirmation',
    //canActivate: [UserGuard],
    loadChildren: () => import('./order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  },
  {
    path: 'shipping',
    //canActivate: [UserGuard],
    loadChildren: () => import('./shipping/shipping.module').then( m => m.ShippingPageModule)
  },
  {
    path: 'order-details',
   // canActivate: [UserGuard],
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'payment',
   // canActivate: [UserGuard],
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }