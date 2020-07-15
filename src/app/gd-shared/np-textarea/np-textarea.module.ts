import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NpI18nModule } from './../np-i18n/np-i18n.module';
import { NpTextareaComponent } from './np-textarea.component';


@NgModule({
  declarations: [NpTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NpI18nModule
  ],
  exports: [NpTextareaComponent]
})
export class NpTextareaModule { }
