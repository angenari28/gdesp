import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdMenuContextoModule } from '@gdesp/gd-menu-contexto/gd-menu-contexto.module';
import { GdFormModule } from '@gdesp/gd-form/gd-form.module';
import { NpI18nModule } from '@gdesp/np-i18n/np-i18n.module';
import { GdAlertModule } from '@gdesp/gd-alert/gd-alert.module';
import { NpWidgetModule } from '@gdesp/np-widget/np-widget.module';
import { NpWidgetGridModule } from '@gdesp/np-widget-grid/np-widget-grid.module';
import { CategoriaComponent } from './categoria.component';
import { CategoriaService } from './categoria.service';
import { CategoriaRoutingModule } from './categoria.module.routing';
import { ElectronService } from 'ngx-electron';


@NgModule({
  declarations: [CategoriaComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NpWidgetGridModule,
    NpWidgetModule,
    GdAlertModule,
    NpI18nModule,
    GdFormModule,
    GdMenuContextoModule,
    CategoriaRoutingModule
  ],
  providers: [CategoriaService, ElectronService]
})
export class CategoriaModule { }
