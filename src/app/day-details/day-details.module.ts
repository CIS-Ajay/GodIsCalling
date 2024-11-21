import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DayDetailsPageRoutingModule } from './day-details-routing.module';

import { DayDetailsPage } from './day-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    DayDetailsPageRoutingModule
  ],
  declarations: [DayDetailsPage]
})
export class DayDetailsPageModule {}
