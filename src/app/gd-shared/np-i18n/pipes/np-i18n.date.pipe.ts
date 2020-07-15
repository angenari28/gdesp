import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

import { NpI18nService } from './../np-i18n.service';
import { DataParser } from './../parsers/data.parser';

@Pipe({
  name: 'npdate',
  pure: false
})
export class NpDatePipe implements PipeTransform {

  constructor(public service: NpI18nService, public router: Router) {

  }

  transform(phrase: any): any {
    if (!phrase) {
      return '';
    }

    return DataParser.parse(phrase, this.service.getConfig(), true).toView;
  }
}
