import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Gdi18nModule } from '@gdesp/gd-i18n/gd-i18n.module';
import { GdInputComponent } from './gd-input.component';

@NgModule({
  declarations: [
    GdInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Gdi18nModule
  ],
  exports: [
    GdInputComponent
  ]
})
export class GdInputModule { }
