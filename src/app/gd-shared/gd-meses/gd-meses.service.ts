import { IKeyValue } from './../gd-interface/key-value.interface';
import { Observable, of } from 'rxjs';
import { GdI18nService } from '@gdesp/gd-i18n/gd-i18n.service';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GdMesesService {

  constructor(private i18n: GdI18nService) {
  }

  getMeses(): Observable<IKeyValue> {
    return of(
      {key: this.i18n.getTranslation('MES-JANEIRO'), value: 0},
      {key: this.i18n.getTranslation('MES-FEVEREIRO'), value: 1},
      {key: this.i18n.getTranslation('MES-MARCO'), value: 2},
      {key: this.i18n.getTranslation('MES-ABRIL'), value: 3},
      {key: this.i18n.getTranslation('MES-MAIO'), value: 4},
      {key: this.i18n.getTranslation('MES-JUNHO'), value: 5},
      {key: this.i18n.getTranslation('MES-JULHO'), value: 6},
      {key: this.i18n.getTranslation('MES-AGOSTO'), value: 7},
      {key: this.i18n.getTranslation('MES-SETEMBRO'), value: 8},
      {key: this.i18n.getTranslation('MES-OUTUBRO'), value: 9},
      {key: this.i18n.getTranslation('MES-NOVEMBRO'), value: 10},
      {key: this.i18n.getTranslation('MES-DEZEMBRO'), value: 11}
    );
  }
}
