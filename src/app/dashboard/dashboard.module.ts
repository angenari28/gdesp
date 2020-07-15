import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronService } from 'ngx-electron';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NpWidgetGridModule } from '@gdesp/np-widget-grid/np-widget-grid.module';
import { NpWidgetModule } from '@gdesp/np-widget/np-widget.module';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ChartDespesasTotalComponent } from '../chart/chart-despesas-total/chart-despesas-total.component';
import { GdAlertModule } from '@gdesp/gd-alert/gd-alert.module';
import { GdContextService } from '@gdesp/gd-context/gd-context.service';
import { DespesasService } from './../despesas/despesas.service';
import { GdFormModule } from '@gdesp/gd-form/gd-form.module';
import { GdEventService } from '@gdesp/gd-event/gd-event.service';

@NgModule({
  declarations: [DashboardComponent, ChartDespesasTotalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NpWidgetGridModule,
    NpWidgetModule,
    GdFormModule,
    ChartsModule,
    GdAlertModule
  ],
  providers: [DespesasService, ElectronService, GdContextService, GdEventService]
})
export class DashboardModule { }
