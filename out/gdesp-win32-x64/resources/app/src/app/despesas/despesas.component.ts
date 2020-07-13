import { DespesasModalComponent } from './despesas-modal/despesas-modal.component';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { DespesaEntity } from './../../../database/src/domain/entity/despesa.entity';
import { CategoriaEntity } from './../../../database/src/domain/entity/categoria.entity';

import { GdMesesService } from '@gdesp/gd-meses/gd-meses.service';
import { NpI18nService } from '@gdesp/np-i18n/np-i18n.service';
import { DespesasService } from './despesas.service';

import { DespesasModel } from './despesas.component.model';
import { GdValidacaoService } from '@gdesp/np-form/gd-validacao/gd-validacao.service';
import { GdValidacaoEspecificacoes } from '@gdesp/np-form/gd-validacao/gd-validacao.especificacoes';
import { NpContextService } from '@gdesp/np-context/np-context.service';
import { NpEventService } from '@gdesp/np-event/np-event.service';
import { GdMenuContextoInterface } from '@gdesp/gd-menu-contexto/gd-menu-contexto.interface';
import { deleteDespesa } from '../../../database/src/domain/channel/despesa.channel';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.less', '../np-shared/np-form/gd-table/gd-table.component.css']
})
export class DespesasComponent implements OnInit, AfterViewInit {

  public form: FormGroup;
  public model: DespesasModel;
  private validacaoService: GdValidacaoService;
  public listaCategorias: CategoriaEntity[];
  public listaMeses: any[] = [];
  public listaAnos: any[] = [{ ano: '2018', id: 2018 }, { ano: '2019', id: 2019 }, { ano: '2020', id: 2020 }];
  public retornoModel: any[] = [];
  public erro: any = false;
  public mesSelecionado: number;
  public idSelecionado: any;
  public modal: DespesasModalComponent;
  public bsModalRef: BsModalRef;

  constructor(private service: DespesasService,
              public i18n: NpI18nService,
              public serviceMeses: GdMesesService,
              public router: Router,
              private contexto: NpContextService,
              private event: NpEventService,
              private modalService: BsModalService) {
    this.setValidations();
  }

  ngOnInit(): void {

    this.i18n.loadResource();
    this.model = new DespesasModel();

    this.setValidations();

    this.getCategoria();

    setTimeout(() => {
      this.getMeses();
      this.getDespesas();
    }, 0);
  }

  setValidations() {
    this.validacaoService = new GdValidacaoService(new GdValidacaoEspecificacoes(this.i18n, this.router));

    this.form = this.validacaoService.getFormGroup(this.model);

    this.validacaoService.setValidators('valor', { required: true, minlength: 1 });
  }

  private getCategoria(): void {
    this.service.getCategoria().subscribe((items) => (this.listaCategorias = items));
  }

  private getMeses(): void {
    this.serviceMeses.getMeses().subscribe((meses) => {
      this.listaMeses = meses;
      this.model.mes = +(new Date().getUTCMonth() - 1);

      this.setValidations();
    });
  }

  private getDespesas(): void {
    this.form.reset();

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

    anos = anos.filter((ano, prox) => {
      return anos.indexOf(ano) === prox;
    });

    anos.forEach((ano, indice) => {
      let mesAno = [];
      let valorMes = 0;
      let categorias = [];

      model.forEach(item => {

        if (ano === item.ano) {
          mesAno.push(item.mes);
        }
      });

      mesAno = mesAno.filter((item, prox) => {
        return mesAno.indexOf(item) === prox;
      });

      mesAno.forEach(mes => {
        model.forEach(data => {
          if (mes === data.mes && ano === data.ano) {
            valorMes += +data.valor;
            categorias.push(data.idCategoria);
          }
        });

        categorias = categorias.filter((item, prox) => {
          return categorias.indexOf(item) === prox;
        });
        this.retornoModel.push({ idCategoria: categorias, ano: ano, mes: mes, valor: valorMes });

        this.retornoModel.forEach(x => {
          const categoria = [];
          x.idCategoria.forEach(c => {
            const name = this.listaCategorias.find(item => +item.id === +c).name;
            categoria.push(name);
          });

          categoria.sort();

          x['categorias'] = categoria.join(', ');
          x['mesNome'] = this.listaMeses.find(m => +m.id === +x.mes).nome;
          x['valorFormatado'] = `R$ ${Number(x.valor).toFixed(2).replace('.', ',')}`;
        });
      });
    });
  }

  public addDespesa(): void {

    if (this.form.invalid) {
      return;
    }

    let despesa = new DespesaEntity();
    despesa = this.model;
    this.service.addDespesa(despesa).subscribe((items) => (this.retornoModel = items));
    this.msgSucesso(this.i18n.getTranslation('SUCESSO_INCLUSAO'));
    this.getDespesas();
  }

  ngAfterViewInit() {
    this.carregarContexto();
  }

  abrirModal(dados) {
    const initialState = [{data: dados}];

    this.bsModalRef = this.modalService.show(DespesasModalComponent, {initialState});
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
    this.event.broadcast('mensagem-alerta-adicionar', {
      contexto: 'mensagem-despesas',
      icone: 'glyphicon glyphicon-remove-sign',
      mensagem: [err.status === 400 || err.status === 500 ? err.text() : this.i18n.getTranslation('ERRO_FALHACOMUNICACAOBASE')],
      severidade: 'danger',
      titulo: this.i18n.getTranslation('ERRO_TITULOERRO')
    });

    this.erro = true;
  }
}
