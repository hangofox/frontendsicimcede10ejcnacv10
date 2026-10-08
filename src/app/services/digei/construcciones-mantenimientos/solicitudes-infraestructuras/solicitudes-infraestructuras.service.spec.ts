import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SolicitudesInfraestructurasService } from './solicitudes-infraestructuras.service';

describe('SolicitudesInfraestructurasService', () => {
  let service: SolicitudesInfraestructurasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(SolicitudesInfraestructurasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
