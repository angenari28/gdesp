import { Component} from '@angular/core';

import { NpLoaderService, TipoLoaderEnum } from '../np-loader.service';
import { NpLoaderInterface } from '../np-loader.interface';

@Component({
  selector: 'np-loader-secao',
  templateUrl: './np-loader-secao.component.html',
  styleUrls: ['./np-loader-secao.component.css']
})

/**
  * COmponente de loader que é aplicado na tela inteira
  */
export class NpLoaderSecaoComponent implements NpLoaderInterface {

  isRequesting: boolean;
  isNavigating: boolean;
  isLoading: boolean;

  constructor(public loader: NpLoaderService) {

  }

  /**
   * Verifica se existe algum endpoint registrado no loaderService associado ao loader do tipo SECAO
   */
  ngDoCheck() {
    if (this.loader.getDefaultLoader() == TipoLoaderEnum.FULL && !this.loader.getLoaderStatus(TipoLoaderEnum.FULL)) {
      this.loader.alterarDefaultLoader(TipoLoaderEnum.SECAO);
    }

    this.isRequesting = this.loader.consultarUrls(TipoLoaderEnum.SECAO);

    this.isNavigating = this.loader.isNavigating;
    this.isLoading = (this.isNavigating || this.isRequesting) && !this.loader.getLoaderStatus(TipoLoaderEnum.FULL);

    //document.documentElement.style.overflow = (this.isNavigating || this.isRequesting) && !this.loader.getLoaderStatus(TipoLoaderEnum.FULL) ? "hidden" : "auto";

    this.loader.setLoaderStatus(TipoLoaderEnum.SECAO, this.isLoading);
  }
}
