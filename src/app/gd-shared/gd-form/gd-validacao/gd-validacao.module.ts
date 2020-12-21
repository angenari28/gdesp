import { NgModule } from '@angular/core';

import { GdFormControl, GdFormGroup, GdButtonSubmitDirective } from './gd-form-control.directive';
import { GdValidacaoEspecificacoes } from './gd-validacao.especificacoes';
import { NpInputFileDirective } from './gd-input-file.directive';

@NgModule({
    declarations: [
      GdFormControl, GdFormGroup, NpInputFileDirective, GdButtonSubmitDirective
    ],
    exports: [
      GdFormControl, GdFormGroup, NpInputFileDirective, GdButtonSubmitDirective
    ],
    providers: [
        GdValidacaoEspecificacoes
    ]
})

export class GdValidacaoModule {

}
