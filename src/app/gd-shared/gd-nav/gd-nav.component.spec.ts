import { BaseI18nService } from './../../../assets/api/gd-i18n/base';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GdJSONService } from './../gd-json/gd-json.service';
import { GdNavComponent } from './gd-nav.component';
import { GdNavModule } from './gd-nav.module';


describe('GdNavComponent', () => {
  let component: GdNavComponent;
  let fixture: ComponentFixture<GdNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [GdNavModule, RouterTestingModule],
      providers: [
        GdJSONService,
        HttpClient,
        HttpHandler,
        BaseI18nService
      ]
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
