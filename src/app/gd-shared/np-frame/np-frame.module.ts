import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NpFrameComponent } from './np-frame.component';
import { NpHeaderModule } from '../np-header/np-header.module';
import { NpNavModule } from '../np-nav/np-nav.module';
import { GdFooterModule } from '../gd-footer/gd-footer.module';
import { GdContentModule } from '../gd-content/gd-content.module';
import { NpNavButtonModule } from '../np-nav-button/np-nav-button.module';

@NgModule({
  declarations: [
    NpFrameComponent
  ],
  exports: [
    NpFrameComponent
  ],
  imports: [
    RouterModule,
    NpHeaderModule,
    NpNavModule,
    GdFooterModule,
    GdContentModule,
    NpNavButtonModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class NpFrameModule { }
