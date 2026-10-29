import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService } from './historial-eq_tr-obr-red-mitig.service';

describe('HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService', () => {
  let service: HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
