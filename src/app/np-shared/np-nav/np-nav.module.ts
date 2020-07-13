import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NpNavComponent } from './np-nav.component';
import { NpNavService } from './np-nav.service';
import { NpI18nModule } from '../np-i18n/np-i18n.module';

@NgModule({
  declarations: [
    NpNavComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    NpI18nModule
  ],
  exports: [
    NpNavComponent
  ],
  providers: [
    NpNavService
  ]
})

export class NpNavModule { }
