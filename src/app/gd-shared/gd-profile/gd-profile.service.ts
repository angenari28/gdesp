import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs';

@Injectable()
export class GdProfileService {
  constructor(private electronService: ElectronService) { }

  closeApp() {
    this.electronService.ipcRenderer.sendSync('close-app').pipe(
      catchError((error: any) => Observable.throw(error.json)
      )
    );
  }
}
