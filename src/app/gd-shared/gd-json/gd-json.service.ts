import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';

import { BaseI18nService } from '../../../assets/api/gd-i18n/base';
import {  } from 'ngx-electron';

@Injectable()
export class GdJSONService {
  constructor(private http: HttpClient, private service: BaseI18nService) {
  }

  public fetch(url): Observable<any> {

    return of(this.service.getJson(url));
  }

  private extractData(res) {
    return res || {};
  }

  private handleError(error: any, url: string) {
    const errMsg = error.status ?
     `Erro ao obter o arquivo ${url}: ${error.status} - ${error.statusText} - message: ${error.message}` : 'Erro inesperado';
    return throwError(errMsg);
  }
}


