import { GdValidacaoModule } from './../gd-validacao/gd-validacao.module';
import { GdButtonComponent } from './gd-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GdButtonComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    GdValidacaoModule
  ],
  exports: [GdButtonComponent]
})
export class GdButtonModule { }
