import { Component, Input, HostListener, ViewContainerRef  } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'gd-datepicker',
  templateUrl: './gd-datepicker.component.html',
  styleUrls: ['./gd-datepicker.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective, useValue: null }
  ]
})

export class GdDatepickerComponent {

  @Input() public label: string;
  @Input() public controlname: string;
  @Input() public callback: Function;
  @Input() public format: string;
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (
      targetElement != this.calendarElement &&
      !targetElement.closest('.calendar') &&
      !targetElement.closest('.popover')) {
      this.showCalendar = false;
    }
  }

  public form: FormGroup;
  public weeks: any[];
  public showCalendar: boolean;
  public selectedYear: number;
  public selectedMonth: number;
  public selectedDay: number;
  public currentDate: any = {};
  public disabled: boolean;
  public inputValue: string = '';
  private calendarElement;
  public months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  constructor(private view: ViewContainerRef, public parent: FormGroupDirective) {
    this.weeks = [];
  }

  ngOnInit() {
    this.showCalendar = false;

    this.form = this.parent.form;
      if (this.form.controls[this.controlname] && this.form.controls[this.controlname].disabled) {
        this.disabled = true;
      } else {
        this.disabled = false;
    }
    this.setCurrentDate(this.form.controls[this.controlname]);
  }

  ngAfterViewInit() {
    this.calendarElement = this.view.element.nativeElement.querySelector('.calendar');
  }

  private setCurrentDate(dateControl: AbstractControl) {
    let date: string = "";
    if (dateControl) {
      date = dateControl.value;
    } else {
      date = new Date().toISOString();
    }

    if (date && date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?-\d{2}:\d{2}$/)) {
      this.currentDate = {
        day: parseInt(date.substr(8, 2)),
        month: parseInt(date.substr(5, 2)),
        year: parseInt(date.substr(0, 4))
      }
      this.selectedDay = this.currentDate.day;
      this.selectedMonth = this.currentDate.month;
      this.selectedYear = this.currentDate.year;
    } else {
      let date = new Date();
      this.currentDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      }
      this.selectedDay = date.getDate();
      this.selectedMonth = date.getMonth() + 1;
      this.selectedYear = date.getFullYear();
    }

    this.fillDays(this.selectedMonth, this.selectedYear);
    this.selectDate(this.selectedDay);
  }

  private fillDays(month: number, year: number) {
    this.weeks = [];
    let week = {
      days: []
    };
    for (let d = 1; d <= 31; d++) {
      let date = new Date(year, month - 1, d);

      if ((date.getMonth() + 1) != month) {
        break;
      }

      if (date.getDay() == 0) {
        this.weeks.push({
          days: week.days.map(_ => _)
        });
        week = {
          days: []
        }
      }

      week.days[date.getDay()] = d;
    }
    this.weeks.push({
      days: week.days.map(_ => _)
    });
  }

  public toogleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  public previousMonth() {
    if (this.selectedMonth == 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.fillDays(this.selectedMonth, this.selectedYear);
  }

  public nextMonth() {
    if (this.selectedMonth == 12) {
      this.selectedMonth = 1;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.fillDays(this.selectedMonth, this.selectedYear);
  }

  public padLeft(str: string, char: string): string {
    if (!str || !char) return "";
    str = str.toString();
    char = char.toString();
    return (char + str).substring(str.length);
  }

  public transformTimeZone(minutos) {
    return this.padLeft((minutos / 60).toFixed(0).toString(), "00") + ":" + this.padLeft((minutos % 60).toString(), "00");
  }

  public selectDate(d) {
    this.showCalendar = false;
    this.selectedDay = d;
    let mask = "yyyy-MM-ddT00:00:00-" + this.transformTimeZone(new Date().getTimezoneOffset());
    let maskWithoutTimeZone = "yyyy-MM-ddT00:00:00";

    mask = mask.replace("yyyy", this.padLeft(this.selectedYear.toString(), "0000"));
    mask = mask.replace("MM", this.padLeft(this.selectedMonth.toString(), "00"));
    mask = mask.replace("dd", this.padLeft(this.selectedDay.toString(), "00"));

    maskWithoutTimeZone = maskWithoutTimeZone.replace("yyyy", this.padLeft(this.selectedYear.toString(), "0000"));
    maskWithoutTimeZone = maskWithoutTimeZone.replace("MM", this.padLeft(this.selectedMonth.toString(), "00"));
    maskWithoutTimeZone = maskWithoutTimeZone.replace("dd", this.padLeft(this.selectedDay.toString(), "00"));

    this.currentDate = {
      day: this.selectedDay,
      month: this.selectedMonth,
      year: this.selectedYear
    }
    this.inputValue = "dd/MM/yyyy";
    this.inputValue = this.inputValue.replace("yyyy", this.padLeft(this.selectedYear.toString(), "0000"));
    this.inputValue = this.inputValue.replace("MM", this.padLeft(this.selectedMonth.toString(), "00"));
    this.inputValue = this.inputValue.replace("dd", this.padLeft(this.selectedDay.toString(), "00"));
    this.form.controls[this.controlname].setValue(this.inputValue);
    this.callback({ controlName: this.controlname, value: maskWithoutTimeZone });
  }
}
