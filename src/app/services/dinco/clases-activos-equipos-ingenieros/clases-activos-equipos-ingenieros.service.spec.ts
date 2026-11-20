import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ClasesActivosEquiposIngenierosService } from './clases-activos-equipos-ingenieros.service';

describe('ClasesActivosEquiposIngenierosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(ClasesActivosEquiposIngenierosService)).toBeTruthy();
  });
});
