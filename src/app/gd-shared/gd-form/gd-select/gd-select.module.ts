import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { GdSelectComponent } from './gd-select.component';
import { Gdi18nModule } from '@gdesp/gd-i18n/gd-i18n.module';

@NgModule({
  declarations: [
    GdSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    Gdi18nModule
  ],
  exports: [
    GdSelectComponent
  ]
})

export class GdSelectModule {

}
