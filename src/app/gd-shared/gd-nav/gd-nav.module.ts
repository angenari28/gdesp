import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GdNavComponent } from './gd-nav.component';
import { GdNavService } from './gd-nav.service';
import { Gdi18nModule } from '../gd-i18n/gd-i18n.module';

@NgModule({
  declarations: [
    GdNavComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    Gdi18nModule
  ],
  exports: [
    GdNavComponent
  ],
  providers: [
    GdNavService
  ]
})

export class GdNavModule { }
