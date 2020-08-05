import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdNavComponent } from './gd-nav.component';

describe('GdNavComponent', () => {
  let component: GdNavComponent;
  let fixture: ComponentFixture<GdNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
