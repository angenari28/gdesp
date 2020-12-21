import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'gd-widget-grid',
  templateUrl: './gd-widget-grid.component.html',
  styleUrls: ['./gd-widget-grid.component.css']
})
export class GdWidgetGridComponent implements OnInit {
  @Input() public columns;

  public responsiveColumns: number;

  constructor() {
    this.columns = this.columns ? this.columns : 1;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 600 && this.columns > 2) {
      this.responsiveColumns = 2;
    } else {
      this.responsiveColumns = this.columns;
    }
  }

  ngOnInit() {
    this.onResize(null);
  }

}
