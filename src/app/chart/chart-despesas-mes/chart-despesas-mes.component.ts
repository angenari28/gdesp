import { ChartService } from './../chart.service';
import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subject } from 'rxjs';

import { CategoriaEntity } from './../../../../database/src/domain/entity/categoria.entity';
import { GdI18nCurrencyPipe } from './../../gd-shared/gd-i18n/pipes/gd-i18n.currency.pipe';
import { GdEventService } from './../../gd-shared/gd-event/gd-event.service';
import { GdContextService } from './../../gd-shared/gd-context/gd-context.service';
import { GdMesesService } from './../../gd-shared/gd-meses/gd-meses.service';
import { DespesasService } from './../../despesas/despesas.service';

@Component({
  selector: 'gd-chart-despesas-mes',
  templateUrl: './chart-despesas-mes.component.html',
  styleUrls: ['./chart-despesas-mes.component.less']
})
export class ChartDespesasMesComponent implements OnInit {

  public anosDespesas: any[] = [];
  public chartReady = false;
  public mesesIndice: any[] = [];
  public despesasTodas: any[] = [];
  public categoriasLista: CategoriaEntity[] = [];
  public anoSelecionado: any;
  public eventSubject: Subject<void> = new Subject<void>();

  constructor(
    private serviceDespesas: DespesasService,
    public serviceMeses: GdMesesService,
    private contexto: GdContextService,
    private event: GdEventService,
    private currencyPipe: GdI18nCurrencyPipe,
    private chartService: ChartService) { }

  public chartLabels: Label[] = [];
  public chartType: ChartType = 'bar';
  public chartOptions: any = {
    legend:
      { display: true, labels: { fontColor: 'black' }},
      tooltips: {
        callbacks: {
          label: (data: { value: number; }) => {
          return this.currencyPipe.transform(data.value);
         },
        },
        hoverBorderColor: '#581845'
      },
     scales: {
       xAxes: [{
         ticks: {}
       }],
       yAxes : [{
         ticks: {
           beginAtZero: true,
           userCallback: (value: number) => {
             return this.currencyPipe.transform(value);
           }
         }
       }]
     }
  };

  public lineChartColors: Color[] = [{
    backgroundColor: ['#737495', '#E8B71A', '#354458', '#5BB12F', '#DD5F32', '#FF5733', '#581845']
  }];
  public chartData: ChartDataSets[] = [];

  filtrarPorAno(ano: any) {

    // this.eventSubject.next(ano);
    this.chartService.alterarAno(ano);

    this.chartReady = false;

    const despesas: any[] = this.despesasTodas.filter(x => x.ano === +ano);
    let categoriasDoAno = [];

    despesas.forEach(x => categoriasDoAno.push(x.idCategoria));

    categoriasDoAno = categoriasDoAno.filter((categoria, prox) => {
      return categoriasDoAno.indexOf(categoria) === prox;
    });

    const dataChart = [];

    categoriasDoAno.forEach((categoria, index) => {
      const data = [];
      const label = this.categoriasLista.find(x => x.value === +categoria).key;
      this.mesesIndice.forEach(mes => {
        const valorMes = despesas.filter(x => +x.mes === +mes && +x.idCategoria === +categoria);

        const saida: string = valorMes.length > 0 ?
          valorMes.map(x => x.valor).reduce((a, b) => a + b, 0) : '0';

        data.push(saida);

      });
      dataChart.push({ data, label, backgroundColor: this.lineChartColors[0].backgroundColor[index] });
    }
    );
    this.chartData = dataChart;

    this.chartReady = true;
  }

  ngOnInit() {
    this.getDespesas();

    if (this.despesasTodas && this.despesasTodas.length > 0) {
      this.anoSelecionado = this.despesasTodas[this.despesasTodas.length] == null
                            || this.despesasTodas[this.despesasTodas.length] === undefined
                            ? this.despesasTodas[this.despesasTodas.length - 1].ano
                            : this.despesasTodas[this.despesasTodas.length].ano;
      this.filtrarPorAno(this.anoSelecionado);
      this.chartReady = true;
      this.chartService.alterarAno(this.anoSelecionado);
    } else {
      this.msgInfo('Não existem despesas');
    }
  }

  private getDespesas() {
    this.getMeses();
    this.getCategorias();

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

  getCategorias() {
    this.serviceDespesas.getCategoria().subscribe((items) => (this.categoriasLista = items));
  }

  getMeses() {
    this.serviceMeses.getMeses().subscribe(res => {
      [res].forEach(x => {
        this.mesesIndice.push(x.value);
        this.chartLabels.push(x.key);
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
}
