import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

import { GdI18nService } from '../gd-i18n.service';

@Pipe({
  name: 'gddate',
  pure: false
})
export class GdDatePipe implements PipeTransform {

  constructor(public service: GdI18nService, public router: Router) {

  }

  transform(phrase: any): any {
    if (!phrase) {
      return '';
    }

    return ''
  }
}
