import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialEquipTranspApoyAtencPrevEmergDesastService } from './historial-eq_tr-apoy-at-prev-em-des.service';

describe('HistorialEquipTranspApoyAtencPrevEmergDesastService', () => {
  let service: HistorialEquipTranspApoyAtencPrevEmergDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialEquipTranspApoyAtencPrevEmergDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
