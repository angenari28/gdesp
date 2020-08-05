import { ControlContainer, FormGroupDirective, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { GdI18nService } from '@gdesp/gd-i18n/gd-i18n.service';

@Component({
  selector: 'gd-textarea',
  templateUrl: './gd-textarea.component.html',
  styleUrls: ['./gd-textarea.component.css'],
  viewProviders: [
    {provide: ControlContainer, useExisting: FormGroupDirective, useValue: null}
  ]
})
export class GdTextareaComponent {
@Input() public form: FormGroup;
@Input() public controlName: string;
@Input() public colunas: number;
@Input() public maxlength: number;
@Input() public label: string;

  constructor(public i18n: GdI18nService) { }

}
