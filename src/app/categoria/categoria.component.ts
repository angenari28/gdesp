import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { GdI18nService } from '@gdesp/gd-i18n/gd-i18n.service';
import { Component, OnInit } from '@angular/core';

import { CategoriaService } from './categoria.service';
import { CategoriaEntity } from '../../../database/src/domain/entity/categoria.entity';
import { GdValidacaoService } from '../gd-shared/gd-form/gd-validacao/gd-validacao.service';
import { GdValidacaoEspecificacoes } from '../gd-shared/gd-form/gd-validacao/gd-validacao.especificacoes';

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

  constructor(private service: CategoriaService,
              public i18n: GdI18nService,
              public router: Router) { }

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
    this.service.getCategoria().subscribe((items) => (this.categorias = items));
    this.contentReady = true;
  }

  addCategoria(): void {

    if (!this.form.valid) {
      return;
    }

    const categoria = new CategoriaEntity();
    categoria.key = this.form.controls.name.value;
    this.service.addCategoria(categoria).subscribe((items) => (this.categorias = items));
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
}

class CategoriaModel {

  public nome: string;

  constructor() {
    this.nome = '';
  }
}
