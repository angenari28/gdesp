import { GdMenuContextoInterface } from './gd-menu-contexto.interface';
import { Component, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Component({
    selector: 'gd-menu-contexto',
    templateUrl: './gd-menu-contexto.component.html',
    styleUrls: ['./gd-menu-contexto.component.css']
})

export class GdMenuContextoComponent implements OnInit {

    @Input() acao: GdMenuContextoInterface;
    public args: any[];
    @Input() disabled: boolean;
    @Input() itemArray: any;
    public internalDisabled: boolean[] = [];
    constructor(
        public element: ElementRef,
        public renderer: Renderer2) { }

    public ngOnInit() {

        if (this.element.nativeElement.closest('td')) {

            this.element.nativeElement.closest('table').querySelector('th').classList.add('menu-contexto');
        }
    }
  }
