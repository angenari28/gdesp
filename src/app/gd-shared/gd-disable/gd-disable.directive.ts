import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[gdDisable]'
})
export class GdDisableDirective {

  @Input() set gdDisable(condicao: boolean){
    const acao = condicao ? 'disable' : 'enable';
    this.ngControl.control[acao]();
  }
  constructor(private ngControl: NgControl) { }

}
