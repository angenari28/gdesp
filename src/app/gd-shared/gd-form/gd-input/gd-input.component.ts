import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup } from '@angular/forms';

import { GdI18nService } from '@gdesp/gd-i18n/gd-i18n.service';

@Component({
  selector: 'gd-input',
  templateUrl: './gd-input.component.html',
  styleUrls: ['./gd-input.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective, useValue: null }
  ]
})

export class GdInputComponent implements OnInit {
  @Input() public label: string;
  @Input() public form: FormGroup;
  @Input() public placeholder: string;
  @Input() public controlname: string;
  @Input() public maxlength: number;
  @Input() public tipo: any = 'text';
  @Input() public parse: string;
  @Input() public min: number;
  @Input() public max: number;

  constructor(public gdi18n: GdI18nService) {
  }

  ngOnInit() {
    this.gdi18n.loadResource();
  }
}
