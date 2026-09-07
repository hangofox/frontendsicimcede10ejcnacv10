import { TestBed } from '@angular/core/testing';
import { TiposEstructurasInfraestructurasService } from './tipos-estructuras-infraestructuras.service';

describe('TiposEstructurasInfraestructurasService', () => {
  let service: TiposEstructurasInfraestructurasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposEstructurasInfraestructurasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
