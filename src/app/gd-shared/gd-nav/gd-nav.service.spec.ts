import { TestBed } from '@angular/core/testing';

import { GdNavService } from './gd-nav.service';

describe('GdNavService', () => {
  let service: GdNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GdNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
