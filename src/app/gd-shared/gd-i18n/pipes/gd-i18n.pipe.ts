import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

import { GdI18nService } from '../gd-i18n.service';

@Pipe({
  name: 'gdi18n',
  pure: false
})
export class GdI18nPipe implements PipeTransform {

  constructor(public service: GdI18nService, public router: Router) {

  }

  transform(phrase: any, arg1?: any, arg2?: any): any {
    if (!phrase && phrase !== '0') {
      return '';
    }

    phrase = phrase.toString();
    if (arg1 && arg1.length > 0) {
      switch (arg1) {
        case 'base':
          return this.service.getTranslation(phrase, '');
        case 'menu':
          return this.service.getTranslation(phrase, 'menu');
        default:
          return this.service.getTranslation(phrase, arg1);
      }
    }
    const dado = this.service.getTranslation(phrase, this.router.url);
    return dado;
  }
}
