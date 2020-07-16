import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

import { DataHoraParser } from '../parsers/data-hora.parser';
import { GdI18nService } from '../gd-i18n.service';

@Pipe({
  name: 'gddatetime'
})
export class GdDatetimePipe implements PipeTransform {

  constructor(public service: GdI18nService, public router: Router) {

  }

  transform(phrase: any): any {
    if (!phrase) {
      return '';
    }

    return DataHoraParser.parseDataHora(phrase, this.service.getConfig(), true, true).toView;
  }

}
