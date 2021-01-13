import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'gd-footer',
  templateUrl: './gd-footer.component.html',
  styleUrls: ['./gd-footer.component.css']
})
export class GdFooterComponent implements OnInit {

  public VERSION  = environment.VERSION;
  constructor() { }

  ngOnInit(): void {
  }

}
