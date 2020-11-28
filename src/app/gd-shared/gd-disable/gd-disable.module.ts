import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdDisableDirective } from './gd-disable.directive';

@NgModule({
  declarations: [ GdDisableDirective],
  imports: [
    CommonModule
  ],
  exports: [GdDisableDirective]
})
export class GdDisableModule { }
