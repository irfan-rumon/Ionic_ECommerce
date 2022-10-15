import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    // loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
      {
        path: 'allfoods',
        loadChildren: () => import('./pages/allfoods/allfoods.module').then(m => m.AllfoodsPageModule)

      },
      {
        path: 'signup',
        loadChildren: () => import('./pages/allfoods/allfoods.module').then(m => m.AllfoodsPageModule)

      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'allfoods',
    loadChildren: () => import('./pages/allfoods/allfoods.module').then(m => m.AllfoodsPageModule)
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
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'mycart',
    loadChildren: () => import('./mycart/mycart.module').then( m => m.MycartPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'myorder',
    loadChildren: () => import('./myorder/myorder.module').then( m => m.MyorderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
