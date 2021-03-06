import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

import { GdI18nService } from '../../gd-i18n/gd-i18n.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'gd-select',
  templateUrl: './gd-select.component.html',
  styleUrls: ['./gd-select.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective, useValue: null }
  ]
})


export class GdSelectComponent implements AfterViewInit {
  public _items: Array<any>;
  public _selected: any;

  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public bindValue: string;
  @Input() public bindLabel: string;
  @Input() public useIcon: boolean;
  @Input() public initData: any;
  @Output() public changeValue = new EventEmitter;

  @Input()
  get items(): Array<any> {

    return this._items;
  }

  set items(lista: Array<any>) {

    this._items = lista;
  }

  @Input()
  get selected(): any {

    return this._selected;
  }

  set selected(dado: any) {
    this._selected = dado;
    this.selectedChange.emit(this._selected);
  }

  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(public i18n: GdI18nService) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ngSelectComponent.handleClearClick();
    }, 0);
  }

  changeSelect(e) {
    if (this._selected == null) { setTimeout(() => {
      this.ngSelectComponent.handleClearClick();
    }, 0);  }
    this.changeValue.emit(e);
  }
}
