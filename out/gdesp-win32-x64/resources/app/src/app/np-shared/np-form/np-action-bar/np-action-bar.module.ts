import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NpActionBarComponent } from './np-action-bar.component';

@NgModule({
  declarations: [
    NpActionBarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    NpActionBarComponent
  ]
})

export class NpActionBarModule {

}
