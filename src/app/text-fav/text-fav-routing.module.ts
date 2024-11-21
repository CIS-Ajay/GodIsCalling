import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextFavPage } from './text-fav.page';

const routes: Routes = [
  {
    path: '',
    component: TextFavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextFavPageRoutingModule {}
