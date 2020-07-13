import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NpI18nDirective} from './np-i18n.directive';
import { NpI18nPipe } from './pipes/np-i18n.pipe';
import { NpDatePipe } from './pipes/np-i18n.date.pipe';
import { NpDatetimePipe } from './pipes/np-i18n.datetime.pipe';
import { NpTimePipe } from './pipes/np-i18n.time.pipe';
import { NpI18nService } from './np-i18n.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
      NpI18nDirective,
      NpI18nPipe,
      NpDatePipe,
      NpDatetimePipe,
      NpTimePipe
    ],
    exports: [
      NpI18nPipe,
      NpDatePipe,
      NpTimePipe,
      NpDatetimePipe,
      NpI18nDirective
    ],
    providers: [
        NpI18nService
    ]
})
export class NpI18nModule { }
