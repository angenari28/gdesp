import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronService } from 'ngx-electron';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GdWidgetGridModule } from '@gdesp/gd-widget-grid/gd-widget-grid.module';
import { GdWidgetModule } from '@gdesp/gd-widget/gd-widget.module';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ChartDespesasTotalComponent } from '../chart/chart-despesas-total/chart-despesas-total.component';
import { GdAlertModule } from '@gdesp/gd-alert/gd-alert.module';
import { GdContextService } from '@gdesp/gd-context/gd-context.service';
import { DespesasService } from './../despesas/despesas.service';
import { GdFormModule } from '@gdesp/gd-form/gd-form.module';
import { GdEventService } from '@gdesp/gd-event/gd-event.service';

import {GdI18nCurrencyPipe } from '../gd-shared/gd-i18n/pipes/gd-i18n.currency.pipe';
@NgModule({
  declarations: [DashboardComponent, ChartDespesasTotalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GdWidgetGridModule,
    GdWidgetModule,
    GdFormModule,
    ChartsModule,
    GdAlertModule
  ],
  providers: [DespesasService, ElectronService, GdContextService, GdEventService, GdI18nCurrencyPipe]
})
export class DashboardModule { }
