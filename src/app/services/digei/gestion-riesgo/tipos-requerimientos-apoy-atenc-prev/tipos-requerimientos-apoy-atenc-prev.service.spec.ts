import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TiposRequerimientosApoyosAtencionPrevencionService } from './tipos-requerimientos-apoy-atenc-prev.service';

describe('TiposRequerimientosApoyosAtencionPrevencionService', () => {
  let service: TiposRequerimientosApoyosAtencionPrevencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TiposRequerimientosApoyosAtencionPrevencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
