import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApoyosObrRedMitigGestRiesgDesastService } from './apoyos-obr-red-mitig-gest-riesg-desast.service';

describe('ApoyosObrRedMitigGestRiesgDesastService', () => {
  let service: ApoyosObrRedMitigGestRiesgDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ApoyosObrRedMitigGestRiesgDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
