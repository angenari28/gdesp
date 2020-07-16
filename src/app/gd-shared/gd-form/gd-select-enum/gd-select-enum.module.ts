import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Gdi18nModule } from '../../gd-i18n/gd-i18n.module';
import { GdSelectEnumComponent } from './gd-select-enum.component';

@NgModule({
    declarations: [
      GdSelectEnumComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        Gdi18nModule
    ],
    exports: [
      GdSelectEnumComponent
    ]
})

export class GdSelectEnumModule { }
