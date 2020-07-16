import { Component} from '@angular/core';

import { GdLoaderService, TipoLoaderEnum } from '../gd-loader.service';
import { GdLoaderInterface } from '../gd-loader.interface';

@Component({
  selector: 'gd-loader-secao',
  templateUrl: './gd-loader-secao.component.html',
  styleUrls: ['./gd-loader-secao.component.css']
})

/**
  * COmponente de loader que é aplicado na tela inteira
  */
export class GdLoaderSecaoComponent implements GdLoaderInterface {

  isRequesting: boolean;
  isNavigating: boolean;
  isLoading: boolean;

  constructor(public loader: GdLoaderService) {

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
