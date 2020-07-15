import { Component, Input, ContentChild, OnInit, DoCheck } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NpLoaderService, TipoLoaderEnum } from '@gdesp/np-loader/np-loader.service';
import { NpEndpointService } from '../../api/np-endpoint.service';

@Component({
  selector: 'gd-form',
  templateUrl: './gd-form.component.html',
  styleUrls: ['./gd-form.component.css']
})

export class GdFormComponent implements OnInit, DoCheck {

  @Input() public formGroup: FormGroup;
  @Input() public submit: Function;
  @Input() public goBack: Function;
  @Input() public submitCaption: string;
  @Input() public endpoints: string[];

  public isLoading: boolean;
  public translatedEndpoint: string[];

  constructor(
    public loader: NpLoaderService,
    public endpointService: NpEndpointService) {

  }

  ngOnInit() {
    this.translatedEndpoint = [];
    if (!this.endpoints) {
      this.endpoints = [];
    }
    this.endpoints.forEach(_ => {
      this.endpointService.getEndpoint(_)
        .subscribe(res => {
          this.translatedEndpoint.push(res);
          this.loader.registrarLoader(res, TipoLoaderEnum.FORM);
        });
    })
  }

  ngDoCheck() {
    this.isLoading = this.translatedEndpoint.some(_ => this.loader.consultarUrls(TipoLoaderEnum.FORM, _));
    this.loader.setLoaderStatus(TipoLoaderEnum.FORM, this.isLoading);

    if (this.isLoading) {
      this.formGroup.disable();
    }

    // Só pode ser chamado caso o form já tenha sido habilitado
    if (!this.isLoading && this.formGroup.disabled) {
      this.formGroup.enable();
    }
  }
}
