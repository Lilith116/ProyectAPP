import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestorepasswordPage } from './restorepassword.page';

const routes: Routes = [
  {
    path: '',
    component: RestorepasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestorepasswordPageRoutingModule {}
