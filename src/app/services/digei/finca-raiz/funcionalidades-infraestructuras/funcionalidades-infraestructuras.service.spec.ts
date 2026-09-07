import { TestBed } from '@angular/core/testing';
import { FuncionalidadesInfraestructurasService } from './funcionalidades-infraestructuras.service';

describe('FuncionalidadesInfraestructurasService', () => {
  let service: FuncionalidadesInfraestructurasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionalidadesInfraestructurasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
