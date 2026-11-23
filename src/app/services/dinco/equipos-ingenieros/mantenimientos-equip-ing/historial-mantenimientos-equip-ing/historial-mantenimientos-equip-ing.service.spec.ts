import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialMantenimientosEquipIngService } from './historial-mantenimientos-equip-ing.service';

describe('HistorialMantenimientosEquipIngService', () => {
  let service: HistorialMantenimientosEquipIngService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialMantenimientosEquipIngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
