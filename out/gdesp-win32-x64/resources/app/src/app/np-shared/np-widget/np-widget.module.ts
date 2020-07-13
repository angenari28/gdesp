import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpWidgetComponent } from './np-widget.component';

@NgModule({
  declarations: [NpWidgetComponent],
  imports: [
    CommonModule
  ],
  exports: [NpWidgetComponent]
})
export class NpWidgetModule { }
