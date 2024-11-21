import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextFavPageRoutingModule } from './text-fav-routing.module';

import { TextFavPage } from './text-fav.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    TextFavPageRoutingModule
  ],
  declarations: [TextFavPage]
})
export class TextFavPageModule {}
