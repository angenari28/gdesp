import { GdProfileModule } from './gd-profile/gd-profile.module';
import { NgModule } from '@angular/core';

import { NpFooterModule } from './np-footer/np-footer.module';
import { NpNavModule } from './np-nav/np-nav.module';
import { NpNavButtonModule } from './np-nav-button/np-nav-button.module';
import { NpHeaderModule } from './np-header/np-header.module';
import { NpContentModule } from './np-content/np-content.module';
import { NpFrameModule } from './np-frame/np-frame.module';
import { NpWidgetModule } from './np-widget/np-widget.module';
import { NpWidgetGridModule } from './np-widget-grid/np-widget-grid.module';
import { NpI18nModule } from './np-i18n/np-i18n.module';
import { NpAlertModule } from './np-alert/np-alert.module';
import { NpFormModule } from './np-form/np-form.module';
import { NpJsonModule } from './np-json/np-json.module';
import { NpLoaderModule } from './np-loader/np-loader.module';
import { GdMenuContextoModule } from '@gdesp/gd-menu-contexto/gd-menu-contexto.module';

@NgModule({

  imports: [ NpFrameModule,
  NpContentModule,
  NpHeaderModule,
  NpNavButtonModule,
  NpNavModule,
  NpFooterModule,
  NpJsonModule,
  NpWidgetGridModule,
  NpWidgetModule,
  NpI18nModule,
  NpAlertModule,
  NpFormModule,
  NpLoaderModule,
  GdMenuContextoModule,
  GdProfileModule
],
  exports: [ NpFrameModule,
    NpContentModule,
    NpHeaderModule,
    NpNavButtonModule,
    NpNavModule,
    NpFooterModule,
    NpJsonModule,
    NpWidgetGridModule,
    NpWidgetModule,
    NpI18nModule,
    NpAlertModule,
    NpFormModule,
    NpLoaderModule,
    GdMenuContextoModule,
    GdProfileModule
  ]
})

export class NpSharedModule {}
