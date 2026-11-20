import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ElementosSubclasificacionesEquiposIngenierosService } from './elementos-subclasificaciones-equipos-ingenieros.service';

describe('ElementosSubclasificacionesEquiposIngenierosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(ElementosSubclasificacionesEquiposIngenierosService)).toBeTruthy();
  });
});
