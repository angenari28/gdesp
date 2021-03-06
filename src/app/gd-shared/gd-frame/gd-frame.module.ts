import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GdFrameComponent } from './gd-frame.component';
import { GdHeaderModule } from '../gd-header/gd-header.module';
import { GdNavModule } from '../gd-nav/gd-nav.module';
import { GdFooterModule } from '../gd-footer/gd-footer.module';
import { GdContentModule } from '../gd-content/gd-content.module';
import { GdNavButtonModule } from '../gd-nav-button/gd-nav-button.module';

@NgModule({
  declarations: [
    GdFrameComponent
  ],
  exports: [
    GdFrameComponent
  ],
  imports: [
    RouterModule,
    GdHeaderModule,
    GdNavModule,
    GdFooterModule,
    GdContentModule,
    GdNavButtonModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class GdFrameModule { }
