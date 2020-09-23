import { NgModule } from '@angular/core';

import { GdProfileModule } from './gd-profile/gd-profile.module';
import { GdFooterModule } from './gd-footer/gd-footer.module';
import { GdNavModule } from './gd-nav/gd-nav.module';
import { GdNavButtonModule } from './gd-nav-button/gd-nav-button.module';
import { GdHeaderModule } from './gd-header/gd-header.module';
import { GdContentModule } from './gd-content/gd-content.module';
import { GdFrameModule } from './gd-frame/gd-frame.module';
import { GdWidgetModule } from './gd-widget/gd-widget.module';
import { GdWidgetGridModule } from './gd-widget-grid/gd-widget-grid.module';
import { Gdi18nModule } from './gd-i18n/gd-i18n.module';
import { GdAlertModule } from './gd-alert/gd-alert.module';
import { GdFormModule } from './gd-form/gd-form.module';
import { GdJsonModule } from './gd-json/gd-json.module';
import { GdLoaderModule } from './gd-loader/gd-loader.module';
import { GdMenuContextoModule } from '@gdesp/gd-menu-contexto/gd-menu-contexto.module';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({

  imports: [GdFrameModule,
    GdContentModule,
    GdHeaderModule,
    GdNavButtonModule,
    GdNavModule,
    GdFooterModule,
    GdJsonModule,
    GdWidgetGridModule,
    GdWidgetModule,
    Gdi18nModule,
    GdAlertModule,
    GdFormModule,
    GdLoaderModule,
    GdMenuContextoModule,
    GdProfileModule,
    NgxMaskModule.forRoot()
  ],
  exports: [GdFrameModule,
    GdContentModule,
    GdHeaderModule,
    GdNavButtonModule,
    GdNavModule,
    GdFooterModule,
    GdJsonModule,
    GdWidgetGridModule,
    GdWidgetModule,
    Gdi18nModule,
    GdAlertModule,
    GdFormModule,
    GdLoaderModule,
    GdMenuContextoModule,
    GdProfileModule
  ]
})

export class GdSharedModule { }
