import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TiposSolicitudesInfraestructurasService } from './tipos-solicitudes-infraestructuras.service';

describe('TiposSolicitudesInfraestructurasService', () => {
  let service: TiposSolicitudesInfraestructurasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TiposSolicitudesInfraestructurasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
