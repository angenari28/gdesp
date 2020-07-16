import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Gdi18nModule } from './../gd-i18n/gd-i18n.module';
import { NpTextareaComponent } from './np-textarea.component';


@NgModule({
  declarations: [NpTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Gdi18nModule
  ],
  exports: [NpTextareaComponent]
})
export class NpTextareaModule { }
