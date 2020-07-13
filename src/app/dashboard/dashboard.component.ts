import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { Label, Color } from 'ng2-charts';
import { ChartType, ChartDataSets } from 'chart.js';

import { DespesasService } from './../despesas/despesas.service';
import { CategoriaEntity } from './../../../database/src/domain/entity/categoria.entity';
import { NpEventService } from './../np-shared/np-event/np-event.service';
import { NpContextService } from './../np-shared/np-context/np-context.service';
import { NpI18nService } from './../np-shared/np-i18n/np-i18n.service';
import { GdMesesService } from '@gdesp/gd-meses/gd-meses.service';

@Component({
  selector: 'np-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public anosDespesas: any[] = [];
  public chartReady: boolean = false;
  public mesesIndice: any[] = [];
  public despesasTodas: any[] = [];
  public categoriasLista: CategoriaEntity[] = [];
  public anoSelecionado: any;
  public eventSubject: Subject<void> = new Subject<void>();

  constructor(private serviceDespesas: DespesasService,
              public serviceMeses: GdMesesService,
              private contexto: NpContextService,
              private event: NpEventService) { }

  public chartLabels: Label[] = [];
  public chartType: ChartType = 'bar';
  public chartOptions: any = {
    legend:
      { display: true, labels: { fontColor: 'black' } }
  };
  public lineChartColors: Color[] = [{
    backgroundColor: ['#737495', '#E8B71A', '#354458', '#5BB12F', '#DD5F32']
  }];
  public chartData: ChartDataSets[] = [];

  filtrarPorAno(ano: any) {

    this.eventSubject.next(ano);

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
      const label = this.categoriasLista.find(x => x.id === +categoria).name;
      this.mesesIndice.forEach(mes => {
        const valorMes = despesas.filter(x => +x.mes === +mes && +x.idCategoria === +categoria);

        const saida: string = valorMes.length > 0 ? Number(valorMes[0].valor).toFixed(2) : '0';

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
      this.anoSelecionado = new Date().getUTCFullYear();
      this.filtrarPorAno(this.anoSelecionado);
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
      res.forEach(x => {
        this.mesesIndice.push(x.id);
        this.chartLabels.push(x.nome);
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
