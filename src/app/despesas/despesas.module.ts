import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdMenuContextoModule } from '@gdesp/gd-menu-contexto/gd-menu-contexto.module';
import { NpFormModule } from '@gdesp/np-form/np-form.module';
import { NpI18nModule } from '@gdesp/np-i18n/np-i18n.module';
import { GdAlertModule } from '@gdesp/gd-alert/gd-alert.module';
import { NpWidgetModule } from '@gdesp/np-widget/np-widget.module';
import { NpWidgetGridModule } from '@gdesp/np-widget-grid/np-widget-grid.module';
import { GdMesesService } from '@gdesp/gd-meses/gd-meses.service';

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
    NpWidgetGridModule,
    NpWidgetModule,
    GdAlertModule,
    NpI18nModule,
    NpFormModule,
    GdMenuContextoModule,
    DespesasRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [DespesasService, ElectronService, GdMesesService, BsModalRef],
  entryComponents: [DespesasModalComponent]
})
export class DespesasModule { }
