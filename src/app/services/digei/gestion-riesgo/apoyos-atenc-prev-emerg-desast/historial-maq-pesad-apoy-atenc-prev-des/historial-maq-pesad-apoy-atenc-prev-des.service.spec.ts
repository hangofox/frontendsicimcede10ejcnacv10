import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialMaqPesadApoyAtencPrevEmergDesastService } from './historial-maq-pesad-apoy-atenc-prev-des.service';

describe('HistorialMaqPesadApoyAtencPrevEmergDesastService', () => {
  let service: HistorialMaqPesadApoyAtencPrevEmergDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialMaqPesadApoyAtencPrevEmergDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
