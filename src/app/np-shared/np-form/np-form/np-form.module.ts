import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NpFormComponent } from './np-form.component';
import { NpI18nModule } from '../../np-i18n/np-i18n.module';
import { NpButtonModule } from '../np-button/np-button.module';
import { NpActionBarModule } from '../np-action-bar/np-action-bar.module';
import { GdValidacaoModule } from '../gd-validacao/gd-validacao.module';

@NgModule({
  declarations: [
    NpFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NpI18nModule,
    NpButtonModule,
    NpActionBarModule,
    GdValidacaoModule
  ],
  exports: [
    NpFormComponent
  ]
})

export class NpFormModule {

}
