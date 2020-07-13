import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'np-fieldset',
  templateUrl: './np-fieldset.component.html',
  styleUrls: ['./np-fieldset.component.css']
})
export class NpFieldsetComponent {
@Input() public titulo: string;

}
