import { FormGroup, NgModel, NgControl } from '@angular/forms';
import { Directive, Input, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

import { GdEventService } from '../gd-event/gd-event.service';
import { GdI18nService } from './gd-i18n.service';
import { NumeroParser } from './parsers/numero.parser';

@Directive({
  selector: '[gdi18n]',
  providers: [NgModel],
  host: {
    '(blur)': 'onBlurParse($event)',
    '(input)': 'OnInput()'
  }
})

export class GdI18nDirective implements OnInit {
  public _disabled: boolean;
  @Input() gdi18n: string;
  @Input() casasDecimais: string;
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
    public service: GdI18nService,
    public container: ViewContainerRef,
    public resolver: ComponentFactoryResolver,
    public control: NgControl,
    public event: GdEventService) {

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
    newValue = newValue ? newValue.toString() : '';
    emitirValueChanges = emitirValueChanges != null ? emitirValueChanges : true;
    let ret: any = {
        toView: newValue,
        toModel: newValue
    };

    switch (this.gdi18n) {
        case 'numero':
            ret = NumeroParser.parse(newValue, this.service.getConfig(), false, true, this.casasDecimais, fromInput);
            break;
    }
    if (this.control.control) {
        this.control.control.setValue(ret.toModel, { onlySelf: false, emitEvent: emitirValueChanges });
    } else {
        this.ngModel.viewToModelUpdate(ret.toModel);
    }
    this.element.nativeElement.value = ret.toView;
}
}
