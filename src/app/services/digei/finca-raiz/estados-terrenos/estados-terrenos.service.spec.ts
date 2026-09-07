import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EstadosTerrenosService } from './estados-terrenos.service';

describe('EstadosTerrenosService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] }));

  it('should be created', () => {
    expect(TestBed.inject(EstadosTerrenosService)).toBeTruthy();
  });
});
