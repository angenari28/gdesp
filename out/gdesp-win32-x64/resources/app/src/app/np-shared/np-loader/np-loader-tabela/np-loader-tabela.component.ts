import { Component, Input, OnInit} from '@angular/core';
import { NpLoaderService, TipoLoaderEnum } from '../np-loader.service';
import { NpEndpointService } from '@gdesp/api/np-endpoint.service';
import { NpLoaderInterface } from '../np-loader.interface';

@Component({
    selector: 'np-loader-tabela',
    templateUrl: './np-loader-tabela.component.html'
})

/**
  * COmponente de loader que é aplicado nas tabelas
  */
export class NpLoaderTabelaComponent implements NpLoaderInterface, OnInit {

    @Input() private endpoint: string[];
    @Input() private id: string;

    isRequesting: boolean;
    isNavigating: boolean;
    isLoading: boolean;
    translatedEndpoint: string[];

    constructor(public loader: NpLoaderService, public endpointService: NpEndpointService) {
        this.translatedEndpoint = [];
    }

    ngOnInit() {
        this.endpoint.forEach(_ => {
            this.endpointService.getEndpoint(_)
                .subscribe(res => {
                    this.translatedEndpoint.push(res);
                    this.loader.registrarLoader(res, TipoLoaderEnum.TABELA, this.id);
                });
        })
    }

    /**
     * Verifica se existe algum endpoint registrado no loaderService associado ao loader do tipo TABELA
     */
    ngDoCheck() {
        this.isRequesting = this.translatedEndpoint.some(_ => this.loader.consultarUrls(TipoLoaderEnum.TABELA, _, this.id));
        this.isNavigating = this.loader.isNavigating;
        this.isLoading = (this.isNavigating || this.isRequesting) && !this.loader.getLoaderStatus(TipoLoaderEnum.FULL) && !this.loader.getLoaderStatus(TipoLoaderEnum.SECAO);
        this.loader.setLoaderStatus(TipoLoaderEnum.TABELA, this.isLoading);
    }
}
