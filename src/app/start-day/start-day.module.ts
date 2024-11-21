import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartDayPageRoutingModule } from './start-day-routing.module';

import { StartDayPage } from './start-day.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    StartDayPageRoutingModule,
  ],
  declarations: [StartDayPage]
})
export class StartDayPageModule {}
