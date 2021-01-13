/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChartDespesasTotalMesComponent } from './chart-despesas-total-mes.component';

describe('ChartDespesasTotalMesComponent', () => {
  let component: ChartDespesasTotalMesComponent;
  let fixture: ComponentFixture<ChartDespesasTotalMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDespesasTotalMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDespesasTotalMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
