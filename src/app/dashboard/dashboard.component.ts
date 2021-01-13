import { ChartService } from './../chart/chart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'gd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private inscricaoEvento: Subscription;
  public anoSelecionado: number;
  constructor(private chartService: ChartService){ }
  ngOnInit() {
    this.inscricaoEvento = this.chartService.anoDespesasChanged$.subscribe(res => {
      this.anoSelecionado = res;
     });
  }

  ngOnDestroy() {
    this.inscricaoEvento.unsubscribe();
  }
}
