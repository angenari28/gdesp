import { NgModule } from '@angular/core';

import { GdFormControl, GdFormGroup } from './gd-form-control.directive';
import { GdValidacaoEspecificacoes } from './gd-validacao.especificacoes';
import { NpInputFileDirective } from './gd-input-file.directive';

@NgModule({
    declarations: [
      GdFormControl, GdFormGroup, NpInputFileDirective
    ],
    exports: [
      GdFormControl, GdFormGroup, NpInputFileDirective
    ],
    providers: [
        GdValidacaoEspecificacoes
    ]
})

export class GdValidacaoModule {

}
