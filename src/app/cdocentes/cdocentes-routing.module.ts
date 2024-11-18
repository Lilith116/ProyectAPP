import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CdocentesPage } from './cdocentes.page';

const routes: Routes = [
  {
    path: '',
    component: CdocentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CdocentesPageRoutingModule {}
