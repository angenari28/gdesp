import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GdActionBarComponent } from './gd-action-bar.component';

@NgModule({
  declarations: [
    GdActionBarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    GdActionBarComponent
  ]
})

export class GdActionBarModule {

}
