
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { CategoriaService } from './categoria.service';
import { CategoriaEntity } from '../../../database/src/domain/entity/categoria.entity';
import { GdValidacaoService } from '../gd-shared/gd-form/gd-validacao/gd-validacao.service';
import { GdValidacaoEspecificacoes } from '../gd-shared/gd-form/gd-validacao/gd-validacao.especificacoes';
import { GdI18nService } from './../gd-shared/gd-i18n/gd-i18n.service';
import { CategoriaModel } from './categoria.model';
import { GdEventService } from './../gd-shared/gd-event/gd-event.service';
import { GdContextService } from './../gd-shared/gd-context/gd-context.service';
@Component({
  selector: 'gd-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.less', '../gd-shared/gd-form/gd-table/gd-table.component.css']
})
export class CategoriaComponent implements OnInit, OnDestroy {
  public categorias: CategoriaEntity[];
  private validacaoService: GdValidacaoService;
  public model: CategoriaModel;
  public form: FormGroup;
  public contentReady = false;
  public erro = false;

  constructor(private service: CategoriaService,
              public i18n: GdI18nService,
              public router: Router,
              private contexto: GdContextService,
              private event: GdEventService) { }

  ngOnInit(): void {
    this.i18n.loadResource();
    this.model = new CategoriaModel();

    this.setValidation();

    this.getCategoria();
  }

  setValidation() {
    this.validacaoService = new GdValidacaoService(new GdValidacaoEspecificacoes(this.i18n, this.router));

    this.form = this.validacaoService.getFormGroup(this.model);

    this.validacaoService.setValidators('nome', { required: true });
  }

  private getCategoria() {
    this.service.getCategoria().subscribe((items) => {
      this.categorias = items.sort((a, b) => {
        return (a.key > b.key) ? 1 : ((a.key < b.key) ? -1 : 0);
        });
      }
    );

    this.contentReady = true;
  }

  addCategoria(): void {

    if (!this.form.valid) {
      return;
    }

    const categoria = new CategoriaEntity();
    categoria.key = this.model.nome;
    this.service.addCategoria(categoria).subscribe((items) => {
      this.categorias = items;
      this.msgSucesso(this.i18n.getTranslation('SUCESSO_INCLUSAO'));
    },
    error => {
      this.tratarErro(error);
    });
  }

  deleteCategoria(): void {
    const item = this.categorias[this.categorias.length - 1];
    this.service
      .deleteCategoria(item)
      .subscribe((items) => (this.categorias = items));
  }

  ngOnDestroy(): void {
    this.model = null;
  }

  carregarContexto() {
    setTimeout(() => {
      const msg = this.contexto.getContext('mensagem-categoria');
      if (msg) {
        this.event.broadcast('mensagem-alerta-adicionar', msg);
        this.contexto.removeContext('mensagem-categoria');
      }
    }, 0);
  }

  public msgSucesso(msg: any) {
    this.contexto.addContext('mensagem-categoria',
      {
        contexto: 'mensagem-categoria',
        icone: 'glyphicon glyphicon-ok',
        mensagem: [msg],
        severidade: 'success',
        titulo: this.i18n.getTranslation('SUCESSO_TITULOSUCESSO')
      });
    this.carregarContexto();
  }

  private tratarErro(err) {
    this.contexto.addContext('mensagem-categoria',
    {
      contexto: 'mensagem-categoria',
      icone: 'glyphicon glyphicon-remove-sign',
      mensagem: [err],
      severidade: 'danger',
      titulo: this.i18n.getTranslation('ERRO_TITULOERRO')
    });

    this.carregarContexto();

    this.erro = true;
  }
}
