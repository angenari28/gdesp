import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NpEventService } from '../../np-event/np-event.service';
import { NpI18nService } from '../../np-i18n/np-i18n.service';

@Component({
    selector: 'gd-select-enum',
    templateUrl: './gd-select-enum.component.html'
})
export class GdSelectEnumComponent implements OnInit {

    public erro: boolean;
    public opcaoInvalida: boolean;
    public mensagemErro: string;

    // @Output() recuperaIndiceEnum: EventEmitter<any> = new EventEmitter();
    @Input() title: string;
    @Input() controlName: string;
    @Input() lista: any[];
    @Input() disabled: boolean;
    @Input() visible: boolean;
    @Input() contextoErro: string;
    @Input() parentForm: FormGroup;
    @Input() primeiraOpcaoVazia: boolean;
    @Input() change: Function;

    constructor(public event: NpEventService,
                public i18n: NpI18nService) {

        this.visible = true;
        this.disabled = false;
        this.primeiraOpcaoVazia = false;
    }

    ngOnInit() {

        this.event.on('form-submitted', (event: Event) => {
            this.validate();
        });
    }

    public mudancaValorSelect() {
        if (this.change) {
            this.change();
        }
    }

    public listarEnum() {
        // this.service.listarEnum(this.routeEnum)
        //     .subscribe(res => {
        //         this.retornoEnum = res;
        //     },
        //     err => {

        //         this.event.broadcast("mensagem-alerta-adicionar", {
        //             contexto: this.contextoErro,
        //             icone: "glyphicon glyphicon-remove-sign",
        //             mensagem: [err.status == 400 || err.status == 500 ? err.text() : this.i18n.getTranslation("ERRO_FALHACOMUNICACAOBASE")],
        //             severidade: "danger",
        //             titulo: this.i18n.getTranslation("ERRO_TITULOERRO")
        //         });
        //         this.erro = true;
        //     })
    }

    validate() {
        this.opcaoInvalida = this.parentForm.controls[this.controlName].invalid;

        if (this.opcaoInvalida) {
            this.mensagemErro =
            this.i18n.getTranslation(this.parentForm.controls[this.controlName].errors.errorMessage, 'base').replace('{0}', this.title);
        }
    }
}
