import { Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, Input, OnInit } from "@angular/core";

import { NpLoaderService, TipoLoaderEnum } from "../np-loader.service";
import { NpEndpointService } from "@gdesp/api/np-endpoint.service";
import { NpLoaderInterface } from "../np-loader.interface";

@Directive({
    selector: "[np-loader-campo]"
})

export class NpLoaderCampoDirective implements NpLoaderInterface, OnInit {

    @Input() private endpoint: string[];
    @Input() private id: string;

    isRequesting: boolean;
    isNavigating: boolean;
    isLoading: boolean;
    translatedEndpoint: string[];

    constructor(public loader: NpLoaderService,
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
        this.isLoading = this.isRequesting && !this.loader.getLoaderStatus(TipoLoaderEnum.FULL) && !this.loader.getLoaderStatus(TipoLoaderEnum.SECAO);
        this.loader.setLoaderStatus(TipoLoaderEnum.CAMPO, this.isLoading);

        if (this.isLoading) {
            this.elementRef.nativeElement.classList.add("np-loader-campo--directive");
        } else {
            this.elementRef.nativeElement.classList.remove("np-loader-campo--directive");
        }
    }
}
