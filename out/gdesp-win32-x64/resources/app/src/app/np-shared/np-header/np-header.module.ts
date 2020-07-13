import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NpHeaderComponent } from './np-header.component';

@NgModule({
  declarations: [
    NpHeaderComponent
  ],
  exports: [
    NpHeaderComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class NpHeaderModule { }
