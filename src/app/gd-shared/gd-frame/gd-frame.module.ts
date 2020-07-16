import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GdFrameComponent } from './gd-frame.component';
import { GdHeaderModule } from '../gd-header/gd-header.module';
import { NpNavModule } from '../np-nav/np-nav.module';
import { GdFooterModule } from '../gd-footer/gd-footer.module';
import { GdContentModule } from '../gd-content/gd-content.module';
import { NpNavButtonModule } from '../np-nav-button/np-nav-button.module';

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
    NpNavModule,
    GdFooterModule,
    GdContentModule,
    NpNavButtonModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class GdFrameModule { }
