import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService } from './historial-equip-transp-apoy-obr-red-mitig-riesg-desast.service';

describe('HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService)).toBeTruthy();
  });
});
