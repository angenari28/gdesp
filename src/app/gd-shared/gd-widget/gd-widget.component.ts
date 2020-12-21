import { Component, AfterViewInit, Input, HostBinding, HostListener, ElementRef, OnInit, DoCheck } from '@angular/core';

import { NpEndpointService } from '../api/np-endpoint.service';

@Component({
  selector: 'gd-widget',
  templateUrl: './gd-widget.component.html',
  styleUrls: ['./gd-widget.component.css']
})
export class GdWidgetComponent implements AfterViewInit, OnInit, DoCheck {

  @Input() public title: string;
  @Input() public colspan;
  @Input() public rowspan;
  @Input() public endpoints: string[];
  @Input() public watch: boolean;
  @Input() public noAnimate: boolean;

  public responsiveColumn: number;
  public trigger: boolean;
  public isLoading: boolean;
  public translatedEndpoint: string[];
  public loadingDisabled: boolean;

  @HostBinding('style.grid-column')
  gridColumn: any = '';
  @HostBinding('style.grid-row')
  gridRow: any = '';
  @HostBinding('style.grid-column-start')
  gridColumnStart: any = '';
  @HostBinding('style.grid-row-start')
  gridRowStart: any = '';
  @HostBinding('style.grid-column-end')
  gridColumnEnd: any = '';
  @HostBinding('style.grid-row-end')
  gridRowEnd: any = '';
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 600 && this.colspan > 2) {
      this.responsiveColumn = 2;
    } else {
      this.responsiveColumn = this.colspan;
    }

    this.ajustarLayout();
  }

  constructor(public elementRef: ElementRef,
    // public loader: NpLoaderService,
              public endpointService: NpEndpointService) {
      this.colspan = this.colspan ? this.colspan : 1;
      this.rowspan = this.rowspan ? this.rowspan : 1;
  }

  ngOnInit() {
    this.translatedEndpoint = [];
    if (!this.endpoints) {
      this.endpoints = [];
    }
    this.endpoints.forEach(_ => {
      this.endpointService.getEndpoint(_)
        .subscribe(res => {
          this.translatedEndpoint.push(res);
          // this.loader.registrarLoader(res, TipoLoaderEnum.WIDGET);
        });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onResize(null);
    }, 0);
  }

  ngDoCheck() {
    if (!this.loadingDisabled) {
      // this.isLoading = this.translatedEndpoint.some(_ => this.loader.consultarUrls(TipoLoaderEnum.WIDGET, _));
      // this.loader.setLoaderStatus(TipoLoaderEnum.WIDGET, this.isLoading);
      if (this.isLoading) {
        this.trigger = true;
      }
      if (!this.isLoading && !this.watch && this.trigger) {
        this.loadingDisabled = true;
      }
    }
  }

  public ajustarLayout() {
    if (this.elementRef.nativeElement.previousSibling == null) {
      if (this.responsiveColumn === 1) {
        this.gridColumn = this.responsiveColumn;
      } else {
        this.gridColumnStart = 1;
        this.gridColumnEnd = + this.responsiveColumn + 1;
      }

      if (this.rowspan === 1) {
        this.gridRow = this.rowspan;
      } else {
        this.gridRowStart = 1;
        this.gridRowEnd = +this.rowspan + 1;
      }
    } else {
      this.gridColumn = 'span ' + this.responsiveColumn;
      this.gridRow = 'span ' + this.rowspan;
    }
  }
}
