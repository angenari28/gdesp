import { Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, Input, OnInit } from "@angular/core";

import { NpLoaderService, TipoLoaderEnum } from "../np-loader.service";
import { NpEndpointService } from "@gdesp/api/np-endpoint.service";
import { NpLoaderInterface } from "../np-loader.interface";

@Directive({
    selector: "np-loader-disabled"
})

export class NpLoaderDisabledDirective implements NpLoaderInterface, OnInit {

    @Input() private endpoint: string;
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

        this.endpointService.getEndpoint(this.endpoint)
            .subscribe(res => {
                this.translatedEndpoint.push(res);
                this.loader.registrarLoader(res, TipoLoaderEnum.DISABLED, this.id);
            });
    }

    ngDoCheck() {
    }
}
