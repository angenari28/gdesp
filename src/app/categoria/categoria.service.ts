import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { getAllCategoria, addCategoria, deleteCategoria } from './../../../database/src/domain/channel/categoria.channel';
import { CategoriaEntity } from './../../../database/src/domain/entity/categoria.entity';

@Injectable()
export class CategoriaService {

  constructor(private electronService: ElectronService) {}

  getCategoria(): Observable<CategoriaEntity[]> {
    return of(this.electronService.ipcRenderer.sendSync(getAllCategoria)).pipe(
      catchError((error: any) => Observable.throw(error.json))
    );
  }

  addCategoria(item: CategoriaEntity): Observable<CategoriaEntity[]> {
    return of(
      this.electronService.ipcRenderer.sendSync(addCategoria, item)
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  deleteCategoria(item: CategoriaEntity): Observable<CategoriaEntity[]> {
    return of(
      this.electronService.ipcRenderer.sendSync(deleteCategoria, item)
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }
}
