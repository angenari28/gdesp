import { Component, Input } from '@angular/core';

@Component({
  selector: 'np-frame',
  templateUrl: './np-frame.component.html',
  styleUrls: ['./np-frame.component.css']
})
export class NpFrameComponent {
  @Input('nav-expanded') public navExpanded: boolean;
}
