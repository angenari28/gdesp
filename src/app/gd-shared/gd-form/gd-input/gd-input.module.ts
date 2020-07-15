import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NpI18nModule } from '@gdesp/np-i18n/np-i18n.module';
import { GdInputComponent } from './gd-input.component';

@NgModule({
  declarations: [
    GdInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NpI18nModule
  ],
  exports: [
    GdInputComponent
  ]
})
export class GdInputModule { }
