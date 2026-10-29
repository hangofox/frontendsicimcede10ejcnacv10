import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService } from './tipos-em-desast-gen-obr-red-mitig.service';

describe('TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService', () => {
  let service: TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
