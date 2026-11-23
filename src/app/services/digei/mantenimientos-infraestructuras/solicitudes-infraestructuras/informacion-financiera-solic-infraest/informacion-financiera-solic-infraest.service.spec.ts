import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InformacionFinancieraSolicInfraestService } from './informacion-financiera-solic-infraest.service';

describe('InformacionFinancieraSolicInfraestService', () => {
  let service: InformacionFinancieraSolicInfraestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(InformacionFinancieraSolicInfraestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
