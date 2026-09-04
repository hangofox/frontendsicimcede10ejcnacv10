import { TestBed } from '@angular/core/testing';
import { SociedadesUnidadesCentralizadorasService } from './sociedades-unidades-centralizadoras.service';

describe('SociedadesUnidadesCentralizadorasService', () => {
  let service: SociedadesUnidadesCentralizadorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SociedadesUnidadesCentralizadorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
