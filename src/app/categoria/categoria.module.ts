import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdMenuContextoModule } from '@gdesp/gd-menu-contexto/gd-menu-contexto.module';
import { GdFormModule } from '@gdesp/gd-form/gd-form.module';
import { Gdi18nModule } from '@gdesp/gd-i18n/gd-i18n.module';
import { GdAlertModule } from '@gdesp/gd-alert/gd-alert.module';
import { GdWidgetModule } from '@gdesp/gd-widget/gd-widget.module';
import { GdWidgetGridModule } from '@gdesp/gd-widget-grid/gd-widget-grid.module';
import { CategoriaComponent } from './categoria.component';
import { CategoriaService } from './categoria.service';
import { CategoriaRoutingModule } from './categoria.module.routing';
import { ElectronService } from 'ngx-electron';


@NgModule({
  declarations: [CategoriaComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GdWidgetGridModule,
    GdWidgetModule,
    GdAlertModule,
    Gdi18nModule,
    GdFormModule,
    GdMenuContextoModule,
    CategoriaRoutingModule
  ],
  providers: [CategoriaService, ElectronService]
})
export class CategoriaModule { }
