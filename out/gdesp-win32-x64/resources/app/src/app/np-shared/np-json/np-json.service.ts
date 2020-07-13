import { map, catchError } from 'rxjs/operators';
import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';

import { BaseI18nService } from '../../../assets/api/np-i18n/base';
import {  } from 'ngx-electron';

@Injectable()
export class NpJSONService {
  constructor(private http: HttpClient, private service: BaseI18nService) {
  }

  public fetch(url): Observable<any> {

    // const isDevMode = process.execPath.match(/[\\/]electron/);
    // const urlFull = `/assets/api${url}`; //`${__dirname}/assets/api${url}` ;

    // if (isDevMode) {
    // return this.http.get<any>(urlFull)
    //   .pipe(
    //     map(this.extractData),
    //     catchError(err => this.handleError(err, urlFull)));
    //   }

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


