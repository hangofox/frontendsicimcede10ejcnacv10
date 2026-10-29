import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialControlAvancObrRedMitigGestRiesgDesastService } from './historial-ctr-avanc-obr-red-mitig.service';

describe('HistorialControlAvancObrRedMitigGestRiesgDesastService', () => {
  let service: HistorialControlAvancObrRedMitigGestRiesgDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialControlAvancObrRedMitigGestRiesgDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
