import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IKeyValue } from './../../gd-interface/key-value.interface';

import { GdEventService } from '../../gd-event/gd-event.service';
import { GdI18nService } from '../../gd-i18n/gd-i18n.service';

@Component({
    selector: 'gd-select-enum',
    templateUrl: './gd-select-enum.component.html',
    styleUrls: ['./gd-select-enum.component.less']
})
export class GdSelectEnumComponent implements OnInit {

    public erro: boolean;
    public opcaoInvalida: boolean;
    public mensagemErro: string;

    // @Output() recuperaIndiceEnum: EventEmitter<any> = new EventEmitter();
    @Input() title: string;
    @Input() controlName: string;
    @Input() lista: IKeyValue[];
    @Input() disabled: boolean;
    @Input() visible: boolean;
    @Input() contextoErro: string;
    @Input() parentForm: FormGroup;
    @Input() primeiraOpcaoVazia: boolean;
    @Input() change = new EventEmitter();
    @Input() form: FormGroup;
    @Input() placeholder: string;

    constructor(public event: GdEventService,
                public i18n: GdI18nService) {

        this.visible = true;
        this.disabled = false;
    }

    ngOnInit() {

      this.event.on('form-submitted', (event: Event) => {
        this.validate();
    });
    }

    validate() {
      this.opcaoInvalida = this.form.controls[this.controlName].invalid;

      if (this.opcaoInvalida) {
          this.mensagemErro =
          this.i18n.getTranslation(this.form.controls[this.controlName].errors.errorMessage, 'base').replace('{0}', this.title);
      }
  }
}
