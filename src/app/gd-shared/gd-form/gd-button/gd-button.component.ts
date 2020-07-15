import { Component, Input, HostBinding, AfterViewInit } from '@angular/core';

@Component({
  selector: 'gd-button',
  templateUrl: './gd-button.component.html',
  styleUrls: ['./gd-button.component.css']
})

export class GdButtonComponent implements AfterViewInit {
  @Input() public title: string;
  @Input() public type: string;
  @Input() public color: string;
  @Input() public black: boolean;
  @Input() public disabled: boolean;
  @Input() public align: string;
  @Input() public callback: Function;
  @HostBinding('style.justify-content')
  textalign: string = 'flex-start';

  ngAfterViewInit() {
    if (!this.callback) {
      this.callback = () => { };
    }
    setTimeout(() => {
      switch (this.align) {
        case 'left':
          this.textalign = 'flex-start';
          break;
        case 'right':
          this.textalign = 'flex-end';
          break;
        case 'center':
          this.textalign = 'center';
          break;
        default:
          this.textalign = 'flex-start';
          break;
      }
    }, 0);
  }
}
