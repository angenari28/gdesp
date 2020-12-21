/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Chart.service.tsService } from './chart.service.ts.service';

describe('Service: Chart.service.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Chart.service.tsService]
    });
  });

  it('should ...', inject([Chart.service.tsService], (service: Chart.service.tsService) => {
    expect(service).toBeTruthy();
  }));
});
