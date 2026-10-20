import { TestBed } from '@angular/core/testing';
import { LineasMandosUnidadesMilitaresSolicInfraestService } from './lineas-mandos-unid-mil-solic-infraest.service';

describe('LineasMandosUnidadesMilitaresSolicInfraestService', () => {
  let service: LineasMandosUnidadesMilitaresSolicInfraestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineasMandosUnidadesMilitaresSolicInfraestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
