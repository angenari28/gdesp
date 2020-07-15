import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GdFormComponent } from './gd-form.component';
import { NpI18nModule } from '../../np-i18n/np-i18n.module';
import { GdButtonModule } from '../gd-button/gd-button.module';
import { GdActionBarModule } from '../gd-action-bar/gd-action-bar.module';
import { GdValidacaoModule } from '../gd-validacao/gd-validacao.module';

@NgModule({
  declarations: [
    GdFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NpI18nModule,
    GdButtonModule,
    GdActionBarModule,
    GdValidacaoModule
  ],
  exports: [
    GdFormComponent
  ]
})

export class GdFormModule {

}
