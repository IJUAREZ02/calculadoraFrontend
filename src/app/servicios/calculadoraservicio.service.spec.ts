import { TestBed } from '@angular/core/testing';

import { CalculadoraservicioService } from './calculadoraservicio.service';

describe('CalculadoraservicioService', () => {
  let service: CalculadoraservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
