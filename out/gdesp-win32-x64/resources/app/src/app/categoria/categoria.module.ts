import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdMenuContextoModule } from '@gdesp/gd-menu-contexto/gd-menu-contexto.module';
import { NpFormModule } from '@gdesp/np-form/np-form.module';
import { NpI18nModule } from '@gdesp/np-i18n/np-i18n.module';
import { NpAlertModule } from '@gdesp/np-alert/np-alert.module';
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
    NpAlertModule,
    NpI18nModule,
    NpFormModule,
    GdMenuContextoModule,
    CategoriaRoutingModule
  ],
  providers: [CategoriaService, ElectronService]
})
export class CategoriaModule { }
