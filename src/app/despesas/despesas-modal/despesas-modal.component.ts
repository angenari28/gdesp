import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { GdI18nService } from '@gdesp/gd-i18n/gd-i18n.service';
import { GdContextService } from '@gdesp/gd-context/gd-context.service';
import { GdEventService } from '@gdesp/gd-event/gd-event.service';
import { GdMenuContextoInterface } from '@gdesp/gd-menu-contexto/gd-menu-contexto.interface';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { DespesasService } from './../despesas.service';

@Component({
  selector: 'gd-despesas-modal',
  templateUrl: './despesas-modal.component.html',
  styleUrls: ['./despesas-modal.component.less', '../../gd-shared/gd-modal/gd-modal.component.css',
    '../../gd-shared/gd-form/gd-table/gd-table.component.css']
})
export class DespesasModalComponent implements OnInit {
  public titulo: any;
  public retornoModel: any = [];
  public listaCategorias: any = [];
  public listaMeses: any = [];
  private erro: any = false;
  public modalFechada: Subject<boolean>;

  public acao: GdMenuContextoInterface[] = [
    {
      callback: this.deletarDespesa.bind(this),
      titulo: 'GENERICO_EXCLUIR'
    }
  ];
  constructor(
    public bsmodalRef: BsModalRef,
    public service: DespesasService,
    private event: GdEventService,
    private contexto: GdContextService,
    private i18n: GdI18nService) { }

  ngOnInit(): void {
    this.modalFechada = new Subject();
    this.inicializarDados();
  }

  inicializarDados() {
    this.getCategorias();

    setTimeout(() => {
      console.log(this.bsmodalRef.content['0'].data['0']);
      const dados = this.bsmodalRef.content['0'].data['0'];

      this.titulo = `${dados.mesNome} / ${dados.ano}`;

      this.getDespesasByYearAndMonth(dados.ano, dados.mes);
    }, 0);
  }

  getCategorias() {
    this.service.getCategoria().subscribe(categorias => {
      this.listaCategorias = categorias;
    });
  }

  deletarDespesa(id: any) {
    if (id === undefined) { return; }

    this.deleteDespesa(id);
  }

  getDespesasByYearAndMonth(ano, mes) {
    this.service.getDespesasByYearAndMonth(ano, mes).subscribe(res => {
      this.retornoModel = res;

      this.retornoModel.forEach(dados => {
        dados['categoriaNome'] = this.listaCategorias.find(x => +x.value === +dados.idCategoria).key;
        dados['valorFormatado'] = `R$ ${Number(dados.valor).toFixed(2).replace('.', ',')}`;
      });

      this.retornoModel.sort()

      console.log(this.retornoModel);
    });
  }

  private deleteDespesa(id: any): void {
    const entity = this.retornoModel.filter(x => x.id === id);
    this.service
      .deleteDespesa(entity[0])
      .subscribe((items) => {
        this.retornoModel = items;
      }, error => {
        this.tratarErro(error);
      });

    this.msgSucesso(this.i18n.getTranslation('SUCESSO_EXCLUSAO'));
    this.inicializarDados();
  }

  carregarContexto() {
    setTimeout(() => {
      const msg = this.contexto.getContext('mensagem-despesas-modal');
      if (msg) {
        this.event.broadcast('mensagem-alerta-adicionar', msg);
        this.contexto.removeContext('mensagem-despesas-modal');
      }
    }, 0);
  }

  public msgSucesso(msg: any) {
    this.contexto.addContext('mensagem-despesas-modal',
      {
        contexto: 'mensagem-despesas-modal',
        icone: 'glyphicon glyphicon-ok',
        mensagem: [msg],
        severidade: 'success',
        titulo: this.i18n.getTranslation('SUCESSO_TITULOSUCESSO')
      });
    this.carregarContexto();
  }

  private tratarErro(err) {

    this.contexto.addContext('mensagem-despesas-modal',
      {
        contexto: 'mensagem-despesas-modal',
        icone: 'glyphicon glyphicon-remove-sign',
        mensagem: [err],
        severidade: 'danger',
        titulo: this.i18n.getTranslation('ERRO_TITULOERRO')
      });
    this.carregarContexto();

    this.erro = true;
  }

  public fechar() {
    this.modalFechada.next(true);
    this.bsmodalRef.hide();
  }
}
