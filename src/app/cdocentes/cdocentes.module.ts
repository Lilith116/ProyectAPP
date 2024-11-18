import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { CdocentesPageRoutingModule } from './cdocentes-routing.module';

import { CdocentesPage } from './cdocentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CdocentesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CdocentesPage]
})
export class CdocentesPageModule {}
