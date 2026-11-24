import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HistorialEquipTranspApoyAtencPrevEmergDesastService } from './historial-equip-transp-apoy-atenc-prev-emerg-desast.service';

describe('HistorialEquipTranspApoyAtencPrevEmergDesastService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(HistorialEquipTranspApoyAtencPrevEmergDesastService)).toBeTruthy();
  });
});
