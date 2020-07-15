import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { ElectronService } from 'ngx-electron';
import { of, Observable, throwError } from 'rxjs';
import { addDespesa, getAllDespesa, deleteDespesa, getAllDespesasByYear,
  getDespesasByYearAndMonth } from './../../../database/src/domain/channel/despesa.channel';
import { getAllCategoria } from './../../../database/src/domain/channel/categoria.channel';
import { CategoriaEntity } from './../../../database/src/domain/entity/categoria.entity';
import { DespesaEntity } from './../../../database/src/domain/entity/despesa.entity';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  constructor(private electronService: ElectronService) { }

  getCategoria(): Observable<CategoriaEntity[]> {
    return of(this.electronService.ipcRenderer.sendSync(getAllCategoria)).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  getDespesas(): Observable<DespesaEntity[]> {
    return of(this.electronService.ipcRenderer.sendSync(getAllDespesa)).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  getDespesasBy(ano: any): Observable<DespesaEntity[]> {
    return of(this.electronService.ipcRenderer.sendSync(getAllDespesasByYear, ano)).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  getDespesasByYearAndMonth(ano: any, mes: any): Observable<DespesaEntity[]> {
    return of(this.electronService.ipcRenderer.sendSync(getDespesasByYearAndMonth, ano, mes)).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  addDespesa(item: DespesaEntity): Observable<DespesaEntity[]> {
    return of(
      this.electronService.ipcRenderer.sendSync(addDespesa, item)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

  deleteDespesa(item: DespesaEntity): Observable<DespesaEntity[]> {
    return of(
      this.electronService.ipcRenderer.sendSync(deleteDespesa, item)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

}
