import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPageRoutingModule } from './forgot-routing.module';

import { ForgotPage } from './forgot.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPageRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule //necessários para validação de formilário

  ],
  declarations: [ForgotPage]
})
export class ForgotPageModule {}
