import { IKeyValue } from './../gd-shared/gd-interface/key-value.interface';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


import { DespesaEntity } from './../../../database/src/domain/entity/despesa.entity';
import { CategoriaEntity } from './../../../database/src/domain/entity/categoria.entity';

import { GdMesesService } from '@gdesp/gd-meses/gd-meses.service';
import { GdI18nService } from '@gdesp/gd-i18n/gd-i18n.service';
import { DespesasService } from './despesas.service';
import { DespesasModalComponent } from './despesas-modal/despesas-modal.component';
import { DespesasModel } from './despesas.component.model';
import { GdValidacaoService } from '@gdesp/gd-form/gd-validacao/gd-validacao.service';
import { GdValidacaoEspecificacoes } from '@gdesp/gd-form/gd-validacao/gd-validacao.especificacoes';
import { GdContextService } from '@gdesp/gd-context/gd-context.service';
import { GdEventService } from '@gdesp/gd-event/gd-event.service';

@Component({
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.less', '../gd-shared/gd-form/gd-table/gd-table.component.css']
})
export class DespesasComponent implements OnInit, AfterViewInit {

  public form: FormGroup;
  public model: DespesasModel;
  private validacaoService: GdValidacaoService;
  public listaCategorias: CategoriaEntity[];
  public listaMeses: IKeyValue[];
  public listaAnos: IKeyValue[];
  public retornoModel: any[] = [];
  public erro: any = false;
  public mesSelecionado: number;
  public idSelecionado: any;
  public modal: DespesasModalComponent;
  public bsModalRef: BsModalRef;
  public contentReady = false;

  constructor(
    private service: DespesasService,
    public element: ElementRef,
    public i18n: GdI18nService,
    public serviceMeses: GdMesesService,
    public router: Router,
    private contexto: GdContextService,
    private event: GdEventService,
    private modalService: BsModalService) {
  }

  ngOnInit(): void {

    this.i18n.loadResource();
    this.model = new DespesasModel();

    this.setValidations();

    this.inicializarDados();

    this.contentReady = true;
  }

  public inicializarDados() {

    this.getCategoria();

    setTimeout(() => {
      this.getMeses();
      this.getAnos();
      this.getDespesas();
      this.setValidations();

      this.model.mes = +(new Date().getUTCMonth());
      this.model.ano = new Date().getUTCFullYear();
    }, 0);
  }

  setValidations() {
    this.validacaoService = new GdValidacaoService(new GdValidacaoEspecificacoes(this.i18n, this.router));

    this.form = this.validacaoService.getFormGroup(this.model);

    this.validacaoService.setValidators('valor', { required: true, isvaluemorethen: 1 });
    this.validacaoService.setValidators('idCategoria', {required: true});
  }

  private getCategoria(): void {
    this.listaCategorias = [];

    this.service.getCategoria().subscribe((items) =>
    (this.listaCategorias = items),
    error => this.tratarErro(error));
  }

  private getMeses(): void {
    this.listaMeses = [];

    this.serviceMeses.getMeses().subscribe((meses) => {
      this.listaMeses.push(meses);
    });
  }

  private getAnos() {
    this.listaAnos = [];

    this.listaAnos = [{key: (new Date().getUTCFullYear() - 1).toString(), value: (new Date().getUTCFullYear() - 1)},
                      {key: (new Date().getUTCFullYear()).toString(), value: (new Date().getUTCFullYear())}];
  }

  private getDespesas(): void {
    this.form.reset();
    this.model = new DespesasModel();

    this.retornoModel = [];

    let model = [];

    this.service.getDespesas().subscribe(
      (items) => {
        model = items;
      }
    );
    let anos = [];
    model.forEach(x => {
      anos.push(x.ano);
    });

    anos = this.retirarItensDuplicados(anos);

    anos.forEach((ano, indice) => {
      let mesAno = [];


      model.forEach(item => {

        if (ano === item.ano) {
          mesAno.push(item.mes);
        }
      });

      mesAno = this.retirarItensDuplicados(mesAno);

      mesAno.forEach(mes => {
        let valorMes = 0;
        let categorias = [];

        model.forEach(data => {
          if (mes === data.mes && ano === data.ano) {
            valorMes += +data.valor;
            categorias.push(data.idCategoria);
          }
        });

        categorias = this.retirarItensDuplicados(categorias);

        this.retornoModel.push({ idCategoria: categorias, ano: ano, mes: mes, valor: valorMes });

        this.retornoModel.forEach(x => {
          const categoria = [];
          x.idCategoria.forEach(c => {
            const name = this.listaCategorias.find(item => +item.value === +c).key;
            categoria.push(name);
          });

          categoria.sort();

          x['categorias'] = categoria.join(', ');
          x['mesNome'] = this.listaMeses.find(m => +m.value === +x.mes).key;
          x['valorFormatado'] = +(x.valor);
        });
      });
    });
  }

  retirarItensDuplicados(obj: any): any {
    return obj.filter((item, prox) => {
      return obj.indexOf(item) === prox;
    });
  }

  public submit = (): void => {

    if (this.form.invalid) {
      return;
    }

    let despesa = new DespesaEntity();
    despesa = this.model;
    this.service.addDespesa(despesa).subscribe();
    this.msgSucesso(this.i18n.getTranslation('SUCESSO_INCLUSAO'));

    this.inicializarDados();
  }

  ngAfterViewInit() {
    this.carregarContexto();
  }

  abrirModal(dados) {
    const initialState = [{ data: dados }];

    this.bsModalRef = this.modalService.show(DespesasModalComponent, { initialState });
    this.bsModalRef.content.modalFechada.subscribe( res => {
      if(res) {
        this.inicializarDados();
      }
    });
  }

  carregarContexto() {
    setTimeout(() => {
      const msg = this.contexto.getContext('mensagem-despesas');
      if (msg) {
        this.event.broadcast('mensagem-alerta-adicionar', msg);
        this.contexto.removeContext('mensagem-despesas');
      }
    }, 0);
  }

  public msgSucesso(msg: any) {
    this.contexto.addContext('mensagem-despesas',
      {
        contexto: 'mensagem-despesas',
        icone: 'glyphicon glyphicon-ok',
        mensagem: [msg],
        severidade: 'success',
        titulo: this.i18n.getTranslation('SUCESSO_TITULOSUCESSO')
      });
    this.carregarContexto();
  }

  private tratarErro(err) {
    this.contexto.addContext('mensagem-despesas',
    {
      contexto: 'mensagem-despesas',
      icone: 'glyphicon glyphicon-remove-sign',
      mensagem: [err],
      severidade: 'danger',
      titulo: this.i18n.getTranslation('ERRO_TITULOERRO')
    });

    this.carregarContexto();

    this.erro = true;
  }
}
