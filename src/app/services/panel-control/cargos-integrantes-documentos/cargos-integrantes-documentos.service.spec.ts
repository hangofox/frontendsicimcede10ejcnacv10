import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CargosIntegrantesDocumentosService } from './cargos-integrantes-documentos.service';

describe('CargosIntegrantesDocumentosService', () => {
  let service: CargosIntegrantesDocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CargosIntegrantesDocumentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
