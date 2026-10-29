import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FotografiasAnexasApoyObrRedMitigGestRiesgDesastService } from './fot-anex-apoy-obr-red-mitig-gest-des.service';

describe('FotografiasAnexasApoyObrRedMitigGestRiesgDesastService', () => {
  let service: FotografiasAnexasApoyObrRedMitigGestRiesgDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FotografiasAnexasApoyObrRedMitigGestRiesgDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
