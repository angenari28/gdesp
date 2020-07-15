import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

import { HoraParser } from './../parsers/hora.parser';
import { NpI18nService } from './../np-i18n.service';

@Pipe({
  name: 'nptime',
  pure: false
})
export class NpTimePipe implements PipeTransform {

  constructor(public service: NpI18nService, public router: Router) {

  }

  transform(phrase: any): any {
    if (!phrase) {
      return '';
    }

    return HoraParser.parse(phrase, this.service.getConfig(), true).toView;
  }

}
