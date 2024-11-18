import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IestudiantesPage } from './iestudiantes.page';

const routes: Routes = [
  {
    path: '',
    component: IestudiantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IestudiantesPageRoutingModule {}
