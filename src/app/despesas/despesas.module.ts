import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdMenuContextoModule } from '@gdesp/gd-menu-contexto/gd-menu-contexto.module';
import { GdFormModule } from '@gdesp/gd-form/gd-form.module';
import { Gdi18nModule } from '@gdesp/gd-i18n/gd-i18n.module';
import { GdAlertModule } from '@gdesp/gd-alert/gd-alert.module';
import { GdWidgetModule } from '@gdesp/gd-widget/gd-widget.module';
import { GdWidgetGridModule } from '@gdesp/gd-widget-grid/gd-widget-grid.module';
import { GdMesesService } from '@gdesp/gd-meses/gd-meses.service';
import { GdLoaderModule } from './../gd-shared/gd-loader/gd-loader.module';

import { DespesasRoutingModule } from './despesas.module.routing';
import { DespesasComponent } from './despesas.component';
import { ElectronService } from 'ngx-electron';
import { DespesasService } from './despesas.service';
import { DespesasModalComponent } from './despesas-modal/despesas-modal.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [DespesasComponent, DespesasModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GdWidgetGridModule,
    GdWidgetModule,
    GdAlertModule,
    Gdi18nModule,
    GdFormModule,
    GdMenuContextoModule,
    GdLoaderModule,
    DespesasRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [DespesasService, ElectronService, GdMesesService, BsModalRef],
  entryComponents: [DespesasModalComponent]
})
export class DespesasModule { }
