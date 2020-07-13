import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NpSelectComponent } from "./np-select.component";
import { NpI18nModule } from '@gdesp/np-i18n/np-i18n.module';

@NgModule({
  declarations: [
    NpSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    NpI18nModule
  ],
  exports: [
    NpSelectComponent
  ]
})

export class NpSelectModule {

}
