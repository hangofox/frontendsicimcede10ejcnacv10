import { TestBed } from '@angular/core/testing';
import { UnidadesMilitaresRealizadorasMantenimientosService } from './unidades-militares-realiz-mttos.service';

describe('UnidadesMilitaresRealizadorasMantenimientosService', () => {
  let service: UnidadesMilitaresRealizadorasMantenimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadesMilitaresRealizadorasMantenimientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
