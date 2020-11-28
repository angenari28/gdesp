import { GdDisableModule } from './../../gd-disable/gd-disable.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GdValidacaoModule } from './../gd-validacao/gd-validacao.module';
import { Gdi18nModule } from '@gdesp/gd-i18n/gd-i18n.module';
import { GdInputComponent } from './gd-input.component';
import { NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    GdInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Gdi18nModule,
    GdValidacaoModule,
    GdDisableModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    GdInputComponent
  ]
})
export class GdInputModule { }
