import { Directive, ElementRef, ViewContainerRef, Input, OnInit } from '@angular/core';

import { GdLoaderService, TipoLoaderEnum } from '../gd-loader.service';
import { NpEndpointService } from '@gdesp/api/np-endpoint.service';
import { GdLoaderInterface } from '../gd-loader.interface';

@Directive({
  selector: 'gd-loader-disabled'
})

export class GdLoaderDisabledDirective implements GdLoaderInterface, OnInit {

  @Input() private endpoint: string;
  @Input() private id: string;

  isRequesting: boolean;
  isNavigating: boolean;
  isLoading: boolean;
  translatedEndpoint: string[];

  constructor(
    public loader: GdLoaderService,
    public elementRef: ElementRef,
    public container: ViewContainerRef,
    public endpointService: NpEndpointService) {
    this.translatedEndpoint = [];
  }

  ngOnInit() {

    this.endpointService.getEndpoint(this.endpoint)
      .subscribe(res => {
        this.translatedEndpoint.push(res);
        this.loader.registrarLoader(res, TipoLoaderEnum.DISABLED, this.id);
      });
  }

  ngDoCheck() {
  }
}
