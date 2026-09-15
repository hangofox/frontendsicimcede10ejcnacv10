import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HistorialQuimicosPiscinasInfraestService } from './historial-quimicos-piscinas-infraest.service';

describe('HistorialQuimicosPiscinasInfraestService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] }));

  it('should be created', () => {
    expect(TestBed.inject(HistorialQuimicosPiscinasInfraestService)).toBeTruthy();
  });
});
