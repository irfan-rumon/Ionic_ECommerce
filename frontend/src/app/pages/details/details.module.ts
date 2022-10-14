import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

import { DetailsPageRoutingModule } from './details-routing.module';


import { DetailsPage } from './details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule
  ],
  declarations: [DetailsPage , BackButtonComponent]
})
export class DetailsPageModule {}