import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IntegrantesApoyosObrRedMitigGestRiesgDesastService } from './integrantes-apoy-obr-red-mitig.service';

describe('IntegrantesApoyosObrRedMitigGestRiesgDesastService', () => {
  let service: IntegrantesApoyosObrRedMitigGestRiesgDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(IntegrantesApoyosObrRedMitigGestRiesgDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
