import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HistorialResponsablesInfraestService } from './historial-responsables-infraest.service';

describe('HistorialResponsablesInfraestService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] }));

  it('should be created', () => {
    expect(TestBed.inject(HistorialResponsablesInfraestService)).toBeTruthy();
  });
});
