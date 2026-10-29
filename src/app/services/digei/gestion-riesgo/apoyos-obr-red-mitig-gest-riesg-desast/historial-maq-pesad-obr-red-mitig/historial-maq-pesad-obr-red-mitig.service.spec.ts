import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialMaqPesadApoyObrRedMitigGestRiesgDesastService } from './historial-maq-pesad-obr-red-mitig.service';

describe('HistorialMaqPesadApoyObrRedMitigGestRiesgDesastService', () => {
  let service: HistorialMaqPesadApoyObrRedMitigGestRiesgDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialMaqPesadApoyObrRedMitigGestRiesgDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
