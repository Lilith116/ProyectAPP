import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IestudiantesPageRoutingModule } from './iestudiantes-routing.module';

import { IestudiantesPage } from './iestudiantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IestudiantesPageRoutingModule
  ],
  declarations: [IestudiantesPage]
})
export class IestudiantesPageModule {}
