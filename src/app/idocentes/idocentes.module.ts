import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdocentesPageRoutingModule } from './idocentes-routing.module';

import { IdocentesPage } from './idocentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdocentesPageRoutingModule
  ],
  declarations: [IdocentesPage]
})
export class IdocentesPageModule {}
