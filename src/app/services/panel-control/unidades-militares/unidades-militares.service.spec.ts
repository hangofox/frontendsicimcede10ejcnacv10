import { TestBed } from '@angular/core/testing';
import { UnidadesMilitaresService } from './unidades-militares.service';

describe('UnidadesMilitaresService', () => {
  let service: UnidadesMilitaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadesMilitaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
