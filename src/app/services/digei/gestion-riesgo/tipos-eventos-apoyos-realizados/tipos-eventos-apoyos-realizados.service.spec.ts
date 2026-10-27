import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TiposEventosApoyosRealizadosService } from './tipos-eventos-apoyos-realizados.service';

describe('TiposEventosApoyosRealizadosService', () => {
  let service: TiposEventosApoyosRealizadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TiposEventosApoyosRealizadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
