import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NpFrameComponent } from './np-frame.component';
import { NpHeaderModule } from '../np-header/np-header.module';
import { NpNavModule } from '../np-nav/np-nav.module';
import { NpFooterModule } from '../np-footer/np-footer.module';
import { NpContentModule } from '../np-content/np-content.module';
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
    NpFooterModule,
    NpContentModule,
    NpNavButtonModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class NpFrameModule { }
