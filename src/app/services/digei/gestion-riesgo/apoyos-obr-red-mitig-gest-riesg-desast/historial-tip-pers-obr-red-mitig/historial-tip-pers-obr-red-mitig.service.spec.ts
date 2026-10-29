import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastService } from './historial-tip-pers-obr-red-mitig.service';

describe('HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastService', () => {
  let service: HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
