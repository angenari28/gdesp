import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NpRowComponent } from './np-row/np-row.component';
import { NpColumnComponent } from './np-column/np-column.component';
import { NpButtonModule } from './np-button/np-button.module';
import { NpActionBarModule } from './np-action-bar/np-action-bar.module';
import { NpFormModule as npformModule} from '@gdesp/np-form/np-form/np-form.module';
import { NpInputModule } from './np-input/np-input.module';
import { NpFieldsetComponent } from './np-fieldset/np-fieldset.component';
import { NpTextareaModule } from './../np-textarea/np-textarea.module';
import { NpSelectModule } from './np-select/np-select.module';
import { GdDatepickerComponent } from './gd-datepicker/gd-datepicker.component';
import { GdSelectEnumModule } from './gd-select-enum/gd-select-enum.module';

@NgModule({
  declarations: [
    NpRowComponent,
    NpColumnComponent,
    NpFieldsetComponent,
    GdDatepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NpButtonModule,
    NpActionBarModule,
    npformModule,
    NpSelectModule,
    NpInputModule,
    NpTextareaModule,
    GdSelectEnumModule
  ],
  exports: [
    NpRowComponent,
    NpColumnComponent,
    NpFieldsetComponent,
    NpButtonModule,
    NpActionBarModule,
    npformModule,
    NpSelectModule,
    NpInputModule,
    NpTextareaModule,
    GdDatepickerComponent,
    GdSelectEnumModule
  ]
})
export class NpFormModule { }
