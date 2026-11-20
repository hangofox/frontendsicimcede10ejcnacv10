import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ClasificacionesEquiposIngenierosService } from './clasificaciones-equipos-ingenieros.service';

describe('ClasificacionesEquiposIngenierosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(ClasificacionesEquiposIngenierosService)).toBeTruthy();
  });
});
