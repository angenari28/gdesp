import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Gdi18nModule } from './../gd-i18n/gd-i18n.module';
import { GdTextareaComponent } from './gd-textarea.component';


@NgModule({
  declarations: [GdTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Gdi18nModule
  ],
  exports: [GdTextareaComponent]
})
export class GdTextareaModule { }
