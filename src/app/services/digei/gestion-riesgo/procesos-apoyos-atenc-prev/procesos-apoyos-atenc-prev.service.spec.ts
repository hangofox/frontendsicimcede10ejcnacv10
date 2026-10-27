import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProcesosApoyosAtencionPrevencionService } from './procesos-apoyos-atenc-prev.service';

describe('ProcesosApoyosAtencionPrevencionService', () => {
  let service: ProcesosApoyosAtencionPrevencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ProcesosApoyosAtencionPrevencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
