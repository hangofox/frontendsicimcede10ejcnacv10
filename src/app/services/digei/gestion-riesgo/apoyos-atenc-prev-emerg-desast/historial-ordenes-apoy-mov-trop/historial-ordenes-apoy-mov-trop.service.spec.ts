import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialOrdenApoyoMovimientoTropaService } from './historial-ordenes-apoy-mov-trop.service';

describe('HistorialOrdenApoyoMovimientoTropaService', () => {
  let service: HistorialOrdenApoyoMovimientoTropaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialOrdenApoyoMovimientoTropaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
