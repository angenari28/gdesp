import { Component, Input } from '@angular/core';

@Component({
  selector: 'np-header',
  templateUrl: './np-header.component.html',
  styleUrls: ['./np-header.component.css']
})
export class NpHeaderComponent {
  @Input('logo-url') public logoUrl: string;
  @Input('logo-click-callback') public logoClickCallback: Function;
  public hidden: boolean = true;
}
