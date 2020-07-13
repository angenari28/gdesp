import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronService } from 'ngx-electron';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NpWidgetGridModule } from '@gdesp/np-widget-grid/np-widget-grid.module';
import { NpWidgetModule } from '@gdesp/np-widget/np-widget.module';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ChartDespesasTotalComponent } from '../chart/chart-despesas-total/chart-despesas-total.component';
import { NpAlertModule } from '@gdesp/np-alert/np-alert.module';
import { NpContextService } from '@gdesp/np-context/np-context.service';
import { DespesasService } from './../despesas/despesas.service';
import { NpFormModule } from '@gdesp/np-form/np-form.module';
import { NpEventService } from '@gdesp/np-event/np-event.service';

@NgModule({
  declarations: [DashboardComponent, ChartDespesasTotalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NpWidgetGridModule,
    NpWidgetModule,
    NpFormModule,
    ChartsModule,
    NpAlertModule
  ],
  providers: [DespesasService, ElectronService, NpContextService, NpEventService]
})
export class DashboardModule { }
