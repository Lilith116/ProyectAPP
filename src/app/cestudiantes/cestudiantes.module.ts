import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { CestudiantesPageRoutingModule } from './cestudiantes-routing.module';

import { CestudiantesPage } from './cestudiantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CestudiantesPageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [CestudiantesPage]
})
export class CestudiantesPageModule {}
