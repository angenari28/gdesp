import { Component, Input } from '@angular/core';

@Component({
  selector: 'gd-header',
  templateUrl: './gd-header.component.html',
  styleUrls: ['./gd-header.component.css']
})
export class GdHeaderComponent {
  @Input('logo-url') public logoUrl: string;
  @Input('logo-click-callback') public logoClickCallback: Function;
  public hidden: boolean = true;
}
