import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { default as localePt } from '@angular/common/locales/pt';
import { GdI18nDirective } from './gd-i18n.directive';
import { GdI18nPipe } from './pipes/gd-i18n.pipe';
import { GdDatePipe } from './pipes/gd-i18n.date.pipe';
import { GdDatetimePipe } from './pipes/gd-i18n.datetime.pipe';
import { GdTimePipe } from './pipes/gd-i18n.time.pipe';
import { GdI18nService } from './gd-i18n.service';
import { GdI18nCurrencyPipe } from './pipes/gd-i18n.currency.pipe';

registerLocaleData(localePt, 'pt');
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GdI18nDirective,
    GdI18nPipe,
    GdDatePipe,
    GdDatetimePipe,
    GdTimePipe,
    GdI18nCurrencyPipe
  ],
  exports: [
    GdI18nPipe,
    GdDatePipe,
    GdTimePipe,
    GdDatetimePipe,
    GdI18nCurrencyPipe,
    GdI18nDirective
  ],
  providers: [
    GdI18nService
  ]
})
export class Gdi18nModule { }
