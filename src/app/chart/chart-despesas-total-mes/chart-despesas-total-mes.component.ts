import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subject, Subscription } from 'rxjs';
import { CategoriaEntity } from '../../../../database/src/domain/entity/categoria.entity';
import { DespesasService } from '../../despesas/despesas.service';
import { GdContextService } from '../../gd-shared/gd-context/gd-context.service';
import { GdEventService } from '../../gd-shared/gd-event/gd-event.service';
import { GdI18nCurrencyPipe } from '../../gd-shared/gd-i18n/pipes/gd-i18n.currency.pipe';
import { GdMesesService } from '../../gd-shared/gd-meses/gd-meses.service';
import { ChartService } from '../chart.service';

@Component({
  selector: 'gd-chart-despesas-total-mes',
  templateUrl: './chart-despesas-total-mes.component.html',
  styleUrls: ['./chart-despesas-total-mes.component.scss']
})
export class ChartDespesasTotalMesComponent implements OnInit, OnDestroy {


  public anosDespesas: any[] = [];
  public chartReady = false;
  public mesesIndice: any[] = [];
  public despesasTodas: any[] = [];
  public categoriasLista: CategoriaEntity[] = [];
  public anoSelecionado: any;
  public eventSubject: Subject<void> = new Subject<void>();
  private inscricaoEvento: Subscription;
  public anoDespesa: number;

  constructor(
    private serviceDespesas: DespesasService,
    public serviceMeses: GdMesesService,
    private contexto: GdContextService,
    private event: GdEventService,
    private currencyPipe: GdI18nCurrencyPipe,
    private chartService: ChartService) { }

  public chartLabels: Label[] = [];
  public chartType: ChartType = 'line';
  public chartOptions: any = {
      legend: {display: false},
      tooltips: {
        callbacks: {
          label: (data: { value: number; }) => {
          return this.currencyPipe.transform(data.value);
         },
        }
      },
     scales: {
       xAxes: [{
         ticks: {
          fontSize: 9
         }
       }],
       yAxes : [{
         ticks: {
           beginAtZero: true,
           userCallback: (value: number) => {
             return this.currencyPipe.transform(value);
           },
          fontSize: 9
         }
       }]
     }
  };

  public lineChartColors: Color[] = [{
    backgroundColor: ['#354458', '#737495', '#E8B71A']
  }];
  public chartData: ChartDataSets[] = [];

  ngOnInit() {
    this.inscricaoEvento = this.chartService.anoDespesasChanged$.subscribe(res => {
      this.anoDespesa = res;
      this.getDespesas();

      if (this.despesasTodas && this.despesasTodas.length > 0) {
        this.filtrarPorAno(this.anoDespesa);
      } else {
        this.msgInfo('Não existem despesas');
      }
    });
  }

  filtrarPorAno(ano: any) {

    this.chartReady = false;

    const despesas: any[] = this.despesasTodas.filter(x => x.ano === +ano);

    const dataChart = [];

    const data = [];
    const label = [];
    this.mesesIndice.forEach(mes => {
        const valoresMes: any[] = despesas.filter(d => +d.mes === +mes).map(v => v.valor);

        const saida: number = valoresMes.reduce((a, b) => a + b, 0);

        data.push(saida);

      });
    dataChart.push({ data, label, backgroundColor: this.lineChartColors[0].backgroundColor[0],
     borderColor: this.lineChartColors[0].backgroundColor[1],
     pointBackgroundColor: this.lineChartColors[0].backgroundColor[2]});

    this.chartData = dataChart;

    this.chartReady = true;
  }

  private getDespesas() {
    this.despesasTodas = [];
    this.getMeses();

    this.serviceDespesas.getDespesas().subscribe(items => {
      this.despesasTodas = items;
      this.setarAnosDespesa(items);
    }
    );
  }

  setarAnosDespesa(anos) {
    anos.forEach(x => {
      this.anosDespesas.push(x.ano);
    });

    this.anosDespesas = this.anosDespesas.filter((ano, prox) => {
      return this.anosDespesas.indexOf(ano) === prox;
    });

    this.anosDespesas.sort((a, b) => a - b);
  }

  getMeses() {
    this.mesesIndice = [];
    this.chartLabels = [];
    this.serviceMeses.getMeses().subscribe(res => {
      [res].forEach(x => {
        this.mesesIndice.push(x.value);
        this.chartLabels.push(x.key.substring(0, 3));
      });
    });
  }

  public carregarContexto() {
    setTimeout(() => {
      const msg = this.contexto.getContext('mensagem-dashboard');
      if (msg) {
        this.event.broadcast('mensagem-alerta-adicionar', msg);
        this.contexto.removeContext('mensagem-dashboard');
      }
    }, 0);
  }

  public msgInfo(msg: any) {
    this.contexto.addContext('mensagem-dashboard',
      {
        contexto: 'mensagem-dashboard',
        icone: 'glyphicon glyphicon-ok',
        mensagem: [msg],
        severidade: 'info',
        titulo: 'Despesas'
      });
    this.carregarContexto();
  }

  ngOnDestroy() {
    this.inscricaoEvento.unsubscribe();
  }
}
