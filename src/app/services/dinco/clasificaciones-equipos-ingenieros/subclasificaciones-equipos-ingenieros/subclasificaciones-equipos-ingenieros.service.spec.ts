import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SubclasificacionesEquiposIngenierosService } from './subclasificaciones-equipos-ingenieros.service';

describe('SubclasificacionesEquiposIngenierosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(SubclasificacionesEquiposIngenierosService)).toBeTruthy();
  });
});
