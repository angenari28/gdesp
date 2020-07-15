import { Component, HostBinding, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'gd-row',
  templateUrl: './gd-row.component.html',
  styleUrls: ['./gd-row.component.css']
})

export class GdRowComponent implements AfterViewInit {
  @Input() public divider: boolean;
  @HostBinding('style.border-top')
  borderTop: any = 'none';

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.divider) {
        this.borderTop = '1px solid #C2C2C2';
      }
    });
  }
}
