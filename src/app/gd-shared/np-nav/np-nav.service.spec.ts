import { TestBed } from '@angular/core/testing';

import { NpNavService } from './np-nav.service';

describe('NpNavService', () => {
  let service: NpNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
