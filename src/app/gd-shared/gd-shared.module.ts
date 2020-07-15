import { NgModule } from '@angular/core';

import { GdProfileModule } from './gd-profile/gd-profile.module';
import { GdFooterModule } from './gd-footer/gd-footer.module';
import { NpNavModule } from './np-nav/np-nav.module';
import { NpNavButtonModule } from './np-nav-button/np-nav-button.module';
import { GdHeaderModule } from './gd-header/gd-header.module';
import { GdContentModule } from './gd-content/gd-content.module';
import { GdFrameModule } from './gd-frame/gd-frame.module';
import { NpWidgetModule } from './np-widget/np-widget.module';
import { NpWidgetGridModule } from './np-widget-grid/np-widget-grid.module';
import { Gdi18nModule } from './gd-i18n/gd-i18n.module';
import { GdAlertModule } from './gd-alert/gd-alert.module';
import { GdFormModule } from './gd-form/gd-form.module';
import { GdJsonModule } from './gd-json/gd-json.module';
import { GdLoaderModule } from './gd-loader/gd-loader.module';
import { GdMenuContextoModule } from '@gdesp/gd-menu-contexto/gd-menu-contexto.module';

@NgModule({

  imports: [GdFrameModule,
    GdContentModule,
    GdHeaderModule,
    NpNavButtonModule,
    NpNavModule,
    GdFooterModule,
    GdJsonModule,
    NpWidgetGridModule,
    NpWidgetModule,
    Gdi18nModule,
    GdAlertModule,
    GdFormModule,
    GdLoaderModule,
    GdMenuContextoModule,
    GdProfileModule
  ],
  exports: [GdFrameModule,
    GdContentModule,
    GdHeaderModule,
    NpNavButtonModule,
    NpNavModule,
    GdFooterModule,
    GdJsonModule,
    NpWidgetGridModule,
    NpWidgetModule,
    Gdi18nModule,
    GdAlertModule,
    GdFormModule,
    GdLoaderModule,
    GdMenuContextoModule,
    GdProfileModule
  ]
})

export class GdSharedModule { }
