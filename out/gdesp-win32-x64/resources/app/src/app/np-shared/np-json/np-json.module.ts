import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NpJSONService } from './np-json.service';
import { BaseI18nService } from './../../../assets/api/np-i18n/base';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [NpJSONService, BaseI18nService]
})

export class NpJsonModule { }
