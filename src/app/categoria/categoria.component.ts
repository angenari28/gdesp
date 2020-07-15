import { FormGroup, FormControl } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { GdI18nService } from '@gdesp/gd-i18n/gd-i18n.service';
import { Component, OnInit } from '@angular/core';

import { CategoriaService } from './categoria.service';
import { CategoriaEntity } from '../../../database/src/domain/entity/categoria.entity';

@Component({
  selector: 'gd-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.less', '../gd-shared/gd-form/gd-table/gd-table.component.css']
})
export class CategoriaComponent implements OnInit, OnDestroy {
public model: CategoriaEntity[];
public form: FormGroup;

  constructor(private service: CategoriaService,
              public i18n: GdI18nService,
              ) {
              }

  ngOnInit(): void {
    this.i18n.loadResource();

    this.getCategoria();

    this.form = new FormGroup({
      name: new FormControl()
    });
  }

  private getCategoria() {
    this.service.getCategoria().subscribe((items) => (this.model = items));
  }

  addCategoria(): void {
    const categoria = new CategoriaEntity();
    categoria.name = this.form.controls.name.value;
    this.service.addCategoria(categoria).subscribe((items) => (this.model = items));
  }

  deleteCategoria(): void {
    const item = this.model[this.model.length - 1];
    this.service
      .deleteCategoria(item)
      .subscribe((items) => (this.model = items));
  }

  ngOnDestroy(): void {
    this.model = null;
  }
}
