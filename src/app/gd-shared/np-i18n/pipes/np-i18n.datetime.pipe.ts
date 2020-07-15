import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

import { DataHoraParser } from './../parsers/data-hora.parser';
import { NpI18nService } from './../np-i18n.service';

@Pipe({
  name: 'npdatetime'
})
export class NpDatetimePipe implements PipeTransform {

  constructor(public service: NpI18nService, public router: Router) {

  }

  transform(phrase: any): any {
    if (!phrase) {
      return '';
    }

    return DataHoraParser.parseDataHora(phrase, this.service.getConfig(), true, true).toView;
  }

}
