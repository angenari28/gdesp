import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { GdHeaderComponent } from './gd-header.component';

@NgModule({
  declarations: [
    GdHeaderComponent
  ],
  exports: [
    GdHeaderComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class GdHeaderModule { }
