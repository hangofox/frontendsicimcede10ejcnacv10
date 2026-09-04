import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IntegrantesDocumentosSolicInfraestService } from './integrantes-documentos-solic-infraest.service';

describe('IntegrantesDocumentosSolicInfraestService', () => {
  let service: IntegrantesDocumentosSolicInfraestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(IntegrantesDocumentosSolicInfraestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
