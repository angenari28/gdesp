import { Subscription } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';

import { DespesasService } from '../../despesas/despesas.service';

import { ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'gd-chart-despesas-total',
  templateUrl: './chart-despesas-total.component.html',
  styleUrls: ['./chart-despesas-total.component.less']
})
export class ChartDespesasTotalComponent implements OnInit, OnDestroy {

  constructor(public service: DespesasService) { }

  @Input() public chartReady: any = false;
  @Input() public evento: Observable<any>;
  @Input() public anoDespesa: number;

  private inscricaoEvento: Subscription;
  private categorias: any[] = [];
  private despesasDoAno: any = [];
  public chartPrincipalReady: any = false;
  public chartLabels: Label[] = [];
  public chartType: ChartType = 'doughnut';
  public chartOptions: any = {
    legend:
      { display: true, labels: { fontColor: 'black' } },
    options: {
      scale: {
        ticks: {
          max: 5,
          min: 0,
          stepSize: 10.5
        }
      }
    }
  };
  public lineChartColors: Color[] = [{
    backgroundColor: ['#737495', '#E8B71A', '#354458', '#5BB12F', '#DD5F32']
  }
  ];
  public chartData: ChartDataSets[] = [];

  ngOnInit(): void {
    this.inscricaoEvento = this.evento.subscribe(res => {
      this.anoDespesa = res;
      this.getDespesasAno();
    });

    this.getDespesasAno();
  }

  private getCategorias() {
    this.service.getCategoria().subscribe(res => {
      this.categorias = res;
    });
  }

  getDespesasAno() {
    this.getCategorias();

    this.service.getDespesasBy(this.anoDespesa).subscribe(res => {
      this.despesasDoAno = res;
    });

    if (this.despesasDoAno && this.despesasDoAno.length > 0) {
    this.getTotalDespesasAno();
    }
  }

  private getTotalDespesasAno() {
    // categorias do ano
    let categoriasId = [];
    this.despesasDoAno.forEach(dados => {
      const idCategoria = +dados.idCategoria;
      categoriasId.push(idCategoria);
    });

    categoriasId = categoriasId.filter((categoria, prox) => {
      return categoriasId.indexOf(categoria) === prox;
    });

    const total = [];
    const categoria = [];

    categoriasId.forEach(c => {
      const nomeCategoria = this.categorias.find(x => x.id === c).name;
      let valorTotal = 0;
      this.despesasDoAno.forEach(dados => {
        valorTotal += c === +dados.idCategoria ? dados.valor : 0;
      });
      categoria.push(nomeCategoria);
      total.push(valorTotal);
    });

    const data = [];
    const label = [];

    data.push({data: total});
    categoria.forEach(x => {
      label.push(x);
    });

    this.chartData = data;
    this.chartLabels = label;
  }

  ngOnDestroy() {
    this.inscricaoEvento.unsubscribe();
  }
}
