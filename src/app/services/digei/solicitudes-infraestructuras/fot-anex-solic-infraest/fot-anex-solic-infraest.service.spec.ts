import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FotografiasAnexasSolicInfraestService } from './fot-anex-solic-infraest.service';

describe('FotografiasAnexasSolicInfraestService', () => {
  let service: FotografiasAnexasSolicInfraestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FotografiasAnexasSolicInfraestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
