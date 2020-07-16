import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NpNavComponent } from './np-nav.component';
import { NpNavService } from './np-nav.service';
import { Gdi18nModule } from '../gd-i18n/gd-i18n.module';

@NgModule({
  declarations: [
    NpNavComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    Gdi18nModule
  ],
  exports: [
    NpNavComponent
  ],
  providers: [
    NpNavService
  ]
})

export class NpNavModule { }
