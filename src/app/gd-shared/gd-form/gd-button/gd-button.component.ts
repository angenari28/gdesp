import { element } from 'protractor';
import { Component, Input, HostBinding, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  @Input() public form: FormGroup;
  @Input() public pillow: any = false;
  @Input() public active: any = false;
  @HostBinding('style.justify-content')
  textalign: string = 'flex-start';

  public class: any;
  public estiloAtivo = 'outline-primary-active';

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
      if (this.pillow) {
        this.class = `${this.color} pillow`;
      } else {
        this.class = this.color;
      }
      this.tornarAtivo();
    }, 0);
  }

  public tornarAtivo() {
    const botoes = document.getElementsByClassName(this.estiloAtivo);
    if (botoes.length > 0) {
    for (let botao = 0; botao <= botoes.length; botao++) {
        botoes[botao].classList.remove(this.estiloAtivo);
      }
    }

    if (this.pillow && this.color === 'outline-primary') {
      this.class += ` ${this.estiloAtivo}`;
    }
  }
}
