import { Observable, of } from 'rxjs';
import { NpI18nService } from '@gdesp/np-i18n/np-i18n.service';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GdMesesService {

  constructor(private i18n: NpI18nService) {
  }

  getMeses(): Observable<any> {
    return of([
      {nome: this.i18n.getTranslation('MES-JANEIRO'), id: 0},
      {nome: this.i18n.getTranslation('MES-FEVEREIRO'), id: 1},
      {nome: this.i18n.getTranslation('MES-MARCO'), id: 2},
      {nome: this.i18n.getTranslation('MES-ABRIL'), id: 3},
      {nome: this.i18n.getTranslation('MES-MAIO'), id: 4},
      {nome: this.i18n.getTranslation('MES-JUNHO'), id: 5},
      {nome: this.i18n.getTranslation('MES-JULHO'), id: 6},
      {nome: this.i18n.getTranslation('MES-AGOSTO'), id: 7},
      {nome: this.i18n.getTranslation('MES-SETEMBRO'), id: 8},
      {nome: this.i18n.getTranslation('MES-OUTUBRO'), id: 9},
      {nome: this.i18n.getTranslation('MES-NOVEMBRO'), id: 10},
      {nome: this.i18n.getTranslation('MES-DEZEMBRO'), id: 11}
    ]);
  }
}
