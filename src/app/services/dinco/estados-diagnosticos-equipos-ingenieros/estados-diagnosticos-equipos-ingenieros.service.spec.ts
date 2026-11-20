import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EstadosDiagnosticosEquiposIngenierosService } from './estados-diagnosticos-equipos-ingenieros.service';

describe('EstadosDiagnosticosEquiposIngenierosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(EstadosDiagnosticosEquiposIngenierosService)).toBeTruthy();
  });
});
