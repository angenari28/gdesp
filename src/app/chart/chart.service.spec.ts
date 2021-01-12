import { Observable } from 'rxjs';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, tick } from '@angular/core/testing';
import { ChartService } from './chart.service';

describe('Service: Chart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartService]
    });
  });

  it('should create', inject([ChartService], (service: ChartService) => {
    expect(service).toBeTruthy();
  }));

  describe('alterarAno', () => {
    it('should call alterarAno', inject([ChartService], (service : ChartService) => {
      service.alterarAno(2020);
      expect(service.anoDespesasChanged$).not.toBeNull();
    }));
  });
});
