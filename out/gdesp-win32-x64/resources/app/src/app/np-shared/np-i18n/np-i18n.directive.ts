import {FormGroup, NgModel, NgControl} from '@angular/forms';
import { Directive, Input, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

import { NpEventService } from './../np-event/np-event.service';
import { NpI18nService } from './np-i18n.service';

@Directive({
  selector: "[npi18n]",
  providers: [NgModel],
  host: {
    "(blur)": "onBlurParse($event)",
    "(input)": "OnInput()"
  }
})

export class NpI18nDirective implements OnInit {
  public _disabled: boolean;
  @Input() npi18n: string;
  @Input() group: FormGroup;
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  };

  public timer: any;
  public field: any;
  constructor(
    public element: ElementRef,
    public ngModel: NgModel,
    public service: NpI18nService,
    public container: ViewContainerRef,
    public resolver: ComponentFactoryResolver,
    public control: NgControl,
    public event: NpEventService) {

    this.event.on('validation-clear', () => {
      this.ngOnInit();
    })
    this.event.on('reload-masks', () => {
      this.onBlur(null, false);
    })
  }

  OnInput() {
    this.parse(this.element.nativeElement.value, false, true);
  }

  ngOnInit() {
    if (!this.service.getConfig()) {
      this.service.loadConfig(this.service.getLanguage().key)
        .subscribe((data: any) => {
          this.parse(this.element.nativeElement.value);
        });
    } else {
      this.parse(this.element.nativeElement.value);
    }

    if (this.ngModel) {
      this.ngModel.valueChanges.subscribe((newValue: string) => {
        if (!newValue) {
          return newValue;
        }
        if (!this.service.getConfig()) {
          this.service.loadConfig(this.service.getLanguage().key)
            .subscribe((data: any) => {
              this.parse(newValue);
            });
        } else {
          this.parse(newValue);
        }
      })
    }
    if (this.control) {

      this.control.control.valueChanges.subscribe((newValue: any) => {

        if (!newValue || this.element.nativeElement.value == newValue) {
          return newValue;
        }

        this.field = Object.keys(newValue)[0];

        if (!this.service.getConfig()) {
          this.service.loadConfig(this.service.getLanguage().key)
            .subscribe((data: any) => {
              this.parse(newValue);
            });

        } else {
          this.parse(newValue);
        }
      })
    }
  }

  onBlurParse(event) {
    this.onBlur(event, true);
  }

  onBlur($event, emitEvent) {
    this.parse(this.element.nativeElement.value, true, false, emitEvent);
  }

  parse(newValue: string, triggerOnBlur?: boolean, fromInput?: boolean, emitirValueChanges?: boolean) {
  }
}
