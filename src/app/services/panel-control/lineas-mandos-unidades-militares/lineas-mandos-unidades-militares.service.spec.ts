import { TestBed } from '@angular/core/testing';
import { LineasMandosUnidadesMilitaresService } from './lineas-mandos-unidades-militares.service';

describe('LineasMandosUnidadesMilitaresService', () => {
  let service: LineasMandosUnidadesMilitaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineasMandosUnidadesMilitaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
