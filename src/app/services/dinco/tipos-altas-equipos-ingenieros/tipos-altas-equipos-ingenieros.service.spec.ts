import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TiposAltasEquiposIngenierosService } from './tipos-altas-equipos-ingenieros.service';

describe('TiposAltasEquiposIngenierosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(TiposAltasEquiposIngenierosService)).toBeTruthy();
  });
});
