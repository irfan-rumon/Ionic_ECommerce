import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from 'src/app/components/header/header.component';



import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SignupPage,HeaderComponent]
})
export class SignupPageModule {}
