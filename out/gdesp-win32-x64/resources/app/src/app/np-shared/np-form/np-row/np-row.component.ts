import { Component, HostBinding, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'np-row',
  templateUrl: './np-row.component.html',
  styleUrls: ['./np-row.component.css']
})

export class NpRowComponent implements AfterViewInit {
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
