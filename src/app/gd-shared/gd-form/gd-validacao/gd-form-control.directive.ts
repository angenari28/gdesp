import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl, AbstractControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GdI18nService } from '@gdesp/gd-i18n/gd-i18n.service';
import { GdEventService } from '../../gd-event/gd-event.service';

@Directive({
  selector: '[formControlName]'
})

export class GdFormControl {

  public labelTitle: string;
  public labelElement: any;
  public type: string;
  static lastEvent: number;

  getOuterMostForm(parentForm) {
    let form = parentForm.parentElement.closest('form');
    if (form) {
      return this.getOuterMostForm(form);
    } else {
      return parentForm;
    }
  }

  constructor(
    public control: NgControl,
    public element: ElementRef,
    public renderer: Renderer2,
    public event: GdEventService,
    public i18n: GdI18nService,
    public router: Router) {

    this.event.on('validation-clear', () => {
      this.cleanControl(null);
    })

    this.event.on('form-submitted', (event) => {
      if (this.getOuterMostForm(this.element.nativeElement.closest('form')) != event.srcElement) {
        return '';
      }

      if (GdFormControl.lastEvent != event.timeStamp) {
        GdFormControl.lastEvent = event.timeStamp;
        control.control.root.updateValueAndValidity();
        this.event.broadcast('reload-masks');
      }

      this.labelElement = this.getLabel();

      this.labelTitle = this.labelElement ? this.labelElement.innerText : '';

      let chkBox = this.element.nativeElement.closest('.check-box');

      if (chkBox && chkBox.closest('[formarrayname]')) {
        let formArray = this.getParentFormArray(this.control.control);
        if (formArray.invalid) {
          let fa = chkBox.closest('[formarrayname]');
          fa.classList.add('has-error');

          if (chkBox.closest('td')) {
            this.type = 'table';
          } else {
            this.type = 'inline block';
          }
          this.createMessage(fa, formArray);
        }
      }

      let node = this.element.nativeElement.closest('.form-group');

      if (this.control && this.control.control && this.control.control.invalid) {
        node.classList.add('has-error');
        this.type = 'field';
        this.createMessage(node, this.control);
      }
    })

    this.event.on('validation-trigger-focus', (event) => {
      if (this.element.nativeElement != event.srcElement.closest('.input-group').querySelector('input')) {
        return;
      }
      this.cleanControl(event);
    })
  }

  getLabel() {
    if (this.element.nativeElement.type == 'checkbox' || this.element.nativeElement.type == 'radio')
      return this.element.nativeElement.closest('label');
    else {
      if (this.element.nativeElement.closest('.form-group')) {
        return this.element.nativeElement.closest('.form-group').querySelector('label');
      } else {
        return null;
      }
    }
  }

  @HostListener('focus', ['$event'])
  public cleanControl(event) {
    let node = this.element.nativeElement.closest('.form-group');
    let formArray = this.element.nativeElement.closest('[formarrayname]');

    if (node) {
      node.classList.remove('has-error');
      this.removeMessage(node);
    }
    else if (formArray) {
      formArray.classList.remove('has-error');
      this.removeMessage(formArray);
    }
  }

  getParentFormArray(control: AbstractControl): FormArray {
    if (control.parent instanceof FormArray) {
      return control.parent;
    } else if (control.parent instanceof AbstractControl) {
      return this.getParentFormArray(control.parent);
    }
    return null;
  }

  createMessage(node: any, control) {
    this.removeMessage(node);

    let url = this.router.url;
    if (this.router.url.match(/.{8}-.{4}-.{4}-.{4}-.{8}/) || this.router.url.match(/\d+$/)) {
      url = this.router.url.substr(0, this.router.url.lastIndexOf('/'));
    }
    if (!control.errors) {
      return;
    }

    let message: string = this.i18n.getTranslation((<any>control.errors).errorMessage, 'base');
    let parseVals: any[] = (<any>control.errors).parseVals;

    if (parseVals) {
      parseVals.forEach((_, index) => {
        let v = _ == 'fieldName' ? this.labelTitle : _.toString();
        message = message.replace('{' + index + '}', v);
      });
    }

    if (message) {
      message = message.replace(' *', '');

      switch (this.type) {
        case 'field':
          this.createMessageElement(node, message);
          break;
        case 'inline block':
          this.createGroupMessageElement(node, message);
          break;
        case 'table':
          this.createTableMessageElement(node, message);
          break;
      }
    }
  }

  createMessageElement(node: any, message: string) {

    let small = this.renderer.createElement('small');
    this.renderer.appendChild(node, small);

    node.lastElementChild.classList.add('help-block');
    node.lastElementChild.classList.add('error-container');
    node.lastElementChild.innerText = message;
  }

  createGroupMessageElement(node: any, message: string) {
    let div1 = this.renderer.createElement('div');
    this.renderer.appendChild(node, div1);
    //node.lastElementChild.classList.add('row');
    node.lastElementChild.classList.add('error-container');
    let div2 = this.renderer.createElement('div');
    this.renderer.appendChild(node.lastElementChild, div2)
    //node.lastElementChild.lastElementChild.classList.add('np-6');
    let small = this.renderer.createElement('small');
    this.renderer.appendChild(node.lastElementChild.lastElementChild, small)
    node.lastElementChild.lastElementChild.lastElementChild.classList.add('help-block');
    node.lastElementChild.lastElementChild.lastElementChild.innerText = message;
  }

  createTableMessageElement(node: any, message: string) {
    let tbody = node.querySelector('tbody');
    let tr = this.renderer.createElement('tr');
    this.renderer.appendChild(tbody, tr)
    tbody.lastElementChild.classList.add('error-container');
    tbody.lastElementChild.setAttribute('colspan', node.querySelector('thead').firstElementChild.childElementCount);
    let small = this.renderer.createElement('small');
    this.renderer.appendChild(tbody.lastElementChild, small);
    tbody.lastElementChild.lastElementChild.classList.add('help-block');
    tbody.lastElementChild.lastElementChild.innerText = message;
  }

  removeMessage(node: any) {
    let smalls: any;
    smalls = node.querySelectorAll('.error-container');

    smalls.forEach(_ => {
      if (this.type == 'table') {
        let bodies = node.querySelectorAll('tbody');
        bodies.forEach(__ => {
          if (__.contains(_)) {
            __.removeChild(_);
          }
        })

      } else {
        if (node.contains(_)) {
          node.removeChild(_);
        }
      }
    })
  }

  ngOnInit() {
    this.control.statusChanges.subscribe((value) => {
      if (this.control.pristine) {
        this.cleanControl(null);
      }
    })
  }

}

@Directive({
  selector: '[formGroup]'
})

export class GdFormGroup {

  constructor(public event: GdEventService) {

  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event) {
    event.preventDefault();
    this.event.broadcast('form-submitted', event);
  }
}
