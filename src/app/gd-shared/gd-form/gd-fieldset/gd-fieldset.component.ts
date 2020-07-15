import { Component, Input } from '@angular/core';

@Component({
  selector: 'gd-fieldset',
  templateUrl: './gd-fieldset.component.html',
  styleUrls: ['./gd-fieldset.component.css']
})
export class GdFieldsetComponent {
@Input() public titulo: string;

}
