import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { GdJSONService } from './gd-json.service';
import { BaseI18nService } from '../../../assets/api/gd-i18n/base';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [GdJSONService, BaseI18nService]
})

export class GdJsonModule { }
