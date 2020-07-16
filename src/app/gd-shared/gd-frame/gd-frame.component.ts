import { Component, Input } from '@angular/core';

@Component({
  selector: 'gd-frame',
  templateUrl: './gd-frame.component.html',
  styleUrls: ['./gd-frame.component.css']
})
export class GdFrameComponent {
  @Input('nav-expanded') public navExpanded: boolean;
}
