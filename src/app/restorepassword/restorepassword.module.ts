import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestorepasswordPageRoutingModule } from './restorepassword-routing.module';

import { RestorepasswordPage } from './restorepassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestorepasswordPageRoutingModule
  ],
  declarations: [RestorepasswordPage]
})
export class RestorepasswordPageModule {}
