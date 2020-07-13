import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NpI18nModule } from '../../np-i18n/np-i18n.module';
import { GdSelectEnumComponent } from './gd-select-enum.component';

@NgModule({
    declarations: [
      GdSelectEnumComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        NpI18nModule
    ],
    exports: [
      GdSelectEnumComponent
    ]
})

export class GdSelectEnumModule { }
