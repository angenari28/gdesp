import { Component, Input, Optional, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup } from '@angular/forms';

import { NpI18nService } from '@gdesp/np-i18n/np-i18n.service';

@Component({
  selector: 'np-input',
  templateUrl: './np-input.component.html',
  styleUrls: ['./np-input.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective, useValue: null }
  ]
})

export class NpInputComponent implements OnInit {
  @Input() public label: string;
  @Input() public form: FormGroup;
  @Input() public placeholder: string;
  @Input() public controlname: string;
  @Input() public maxlength: number;
  @Input() public tipo: any = 'text';
  @Input() public parse: string;
  @Input() public min: number;
  @Input() public max: number;

  constructor(public npi18n: NpI18nService) {
  }

  ngOnInit() {
    this.npi18n.loadResource();
  }
}
