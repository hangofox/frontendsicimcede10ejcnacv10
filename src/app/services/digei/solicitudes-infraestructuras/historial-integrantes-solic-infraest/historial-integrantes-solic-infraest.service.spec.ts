import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialIntegrantesSolicInfraestService } from './historial-integrantes-solic-infraest.service';

describe('HistorialIntegrantesSolicInfraestService', () => {
  let service: HistorialIntegrantesSolicInfraestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialIntegrantesSolicInfraestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
