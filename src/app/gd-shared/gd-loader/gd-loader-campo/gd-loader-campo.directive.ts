import { Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, Input, OnInit, DoCheck } from '@angular/core';

import { GdLoaderService, TipoLoaderEnum } from '../gd-loader.service';
import { NpEndpointService } from '@gdesp/api/np-endpoint.service';
import { GdLoaderInterface } from '../gd-loader.interface';

@Directive({
  selector: '[gd-loader-campo]'
})

export class GdLoaderCampoDirective implements GdLoaderInterface, OnInit, DoCheck {

  @Input() private endpoint: string[];
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
    this.endpoint.forEach(_ => {
      this.endpointService.getEndpoint(_)
        .subscribe(res => {
          this.translatedEndpoint.push(res);
          this.loader.registrarLoader(res, TipoLoaderEnum.CAMPO, this.id);
        });
    })
  }

  /**
   * Verifica se existe algum endpoint registrado no loaderService associado ao loader do tipo CAMPO
   */
  ngDoCheck() {
    this.isRequesting = this.translatedEndpoint.some(_ => this.loader.consultarUrls(TipoLoaderEnum.CAMPO, _, this.id));
    this.isLoading =
      this.isRequesting && !this.loader.getLoaderStatus(TipoLoaderEnum.FULL) && !this.loader.getLoaderStatus(TipoLoaderEnum.SECAO);
    this.loader.setLoaderStatus(TipoLoaderEnum.CAMPO, this.isLoading);

    if (this.isLoading) {
      this.elementRef.nativeElement.classList.add('gd-loader-campo--directive');
    } else {
      this.elementRef.nativeElement.classList.remove('gd-loader-campo--directive');
    }
  }
}
