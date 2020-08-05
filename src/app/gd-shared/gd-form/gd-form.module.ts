import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GdRowComponent } from './gd-row/gd-row.component';
import { GdColumnComponent } from './gd-column/gd-column.component';
import { GdButtonModule } from './gd-button/gd-button.module';
import { GdActionBarModule } from './gd-action-bar/gd-action-bar.module';
import { GdFormModule as gdformModule} from '@gdesp/gd-form/gd-form/gd-form.module';
import { GdInputModule } from './gd-input/gd-input.module';
import { GdFieldsetComponent } from './gd-fieldset/gd-fieldset.component';
import { GdTextareaModule } from '../gd-textarea/gd-textarea.module';
import { GdSelectModule } from './gd-select/gd-select.module';
import { GdDatepickerComponent } from './gd-datepicker/gd-datepicker.component';
import { GdSelectEnumModule } from './gd-select-enum/gd-select-enum.module';

@NgModule({
  declarations: [
    GdRowComponent,
    GdColumnComponent,
    GdFieldsetComponent,
    GdDatepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GdButtonModule,
    GdActionBarModule,
    gdformModule,
    GdSelectModule,
    GdInputModule,
    GdTextareaModule,
    GdSelectEnumModule
  ],
  exports: [
    GdRowComponent,
    GdColumnComponent,
    GdFieldsetComponent,
    GdButtonModule,
    GdActionBarModule,
    gdformModule,
    GdSelectModule,
    GdInputModule,
    GdTextareaModule,
    GdDatepickerComponent,
    GdSelectEnumModule
  ]
})
export class GdFormModule { }
