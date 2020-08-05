import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GdJSONService } from '../gd-json/gd-json.service';

@Injectable()
export class GdNavService {

  constructor(public jsonService: GdJSONService) { }

  public loadMenu(): Observable<any> {
    return this.jsonService.fetch('/menu-items.json');
  }
}
