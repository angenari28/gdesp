import { ControlContainer, FormGroupDirective, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { NpI18nService } from '@gdesp/np-i18n/np-i18n.service';

@Component({
  selector: 'np-textarea',
  templateUrl: './np-textarea.component.html',
  styleUrls: ['./np-textarea.component.css'],
  viewProviders: [
    {provide: ControlContainer, useExisting: FormGroupDirective, useValue: null}
  ]
})
export class NpTextareaComponent {
@Input() public form: FormGroup;
@Input() public controlName: string;
@Input() public colunas: number;
@Input() public maxlength: number;
@Input() public label: string;

  constructor(public i18n: NpI18nService) { }

}
