import { Observable, of } from 'rxjs';

import * as menu from 'assets/api/menu-items.json';

export class MenuItem {

public get(): Observable<any> {
  return of(menu);
    }
}
