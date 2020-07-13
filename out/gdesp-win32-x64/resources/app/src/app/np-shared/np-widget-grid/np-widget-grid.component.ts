import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'np-widget-grid',
  templateUrl: './np-widget-grid.component.html',
  styleUrls: ['./np-widget-grid.component.css']
})
export class NpWidgetGridComponent implements OnInit {
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
