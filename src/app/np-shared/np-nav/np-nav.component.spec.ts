import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpNavComponent } from './np-nav.component';

describe('NpNavComponent', () => {
  let component: NpNavComponent;
  let fixture: ComponentFixture<NpNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
