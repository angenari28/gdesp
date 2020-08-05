import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdWidgetComponent } from './gd-widget.component';

@NgModule({
  declarations: [GdWidgetComponent],
  imports: [
    CommonModule
  ],
  exports: [GdWidgetComponent]
})
export class GdWidgetModule { }
