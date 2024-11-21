import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayDetailsPage } from './day-details.page';

const routes: Routes = [
  {
    path: '',
    component: DayDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayDetailsPageRoutingModule {}
