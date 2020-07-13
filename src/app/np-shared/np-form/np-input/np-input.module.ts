import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NpI18nModule } from '@gdesp/np-i18n/np-i18n.module';
import { NpInputComponent } from './np-input.component';

@NgModule({
  declarations: [
    NpInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NpI18nModule
  ],
  exports: [
    NpInputComponent
  ]
})
export class NpInputModule { }
