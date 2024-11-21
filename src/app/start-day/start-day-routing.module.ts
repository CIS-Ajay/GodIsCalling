import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartDayPage } from './start-day.page';

const routes: Routes = [
  {
    path: '',
    component: StartDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartDayPageRoutingModule {}
