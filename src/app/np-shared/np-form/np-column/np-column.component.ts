import { Component, Input, HostBinding, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'np-column',
  templateUrl: './np-column.component.html',
  styleUrls: ['./np-column.component.css']
})

export class NpColumnComponent implements AfterViewInit{
  @Input() public size: number = 6;
  @Input() public align: string;

  public contentAlign: string;

  @HostBinding('style.grid-column')
  gridColumn: any = '';
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.ajustarLayout();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ajustarLayout();

      switch (this.align) {
        case 'left':
          this.contentAlign = 'flex-start';
          break;
        case 'right':
          this.contentAlign = 'flex-end';
          break;
        case 'center':
          this.contentAlign = 'center';
          break;
        default:
          this.contentAlign = 'flex-start';
          break;
      }
    }, 0);
  }

  public ajustarLayout() {
    if (this.size > 6) {
      this.size = 6;
    }
    if (this.size < 1) {
      this.size = 1;
    }

    if (window.innerWidth <= 600) {
      this.gridColumn = 'span 1';
    } else {
      this.gridColumn = 'span ' + this.size;
    }
  }
}
