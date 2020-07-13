import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { NpJSONService } from '../np-json/np-json.service';

@Injectable()
export class NpNavService {

  constructor(public jsonService: NpJSONService) { }

  public loadMenu(): Observable<any> {
    return this.jsonService.fetch('/menu-items.json');
  }
}
