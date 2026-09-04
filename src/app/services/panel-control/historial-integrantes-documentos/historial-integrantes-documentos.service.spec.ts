import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HistorialIntegrantesDocumentosService } from './historial-integrantes-documentos.service';

describe('HistorialIntegrantesDocumentosService', () => {
  let service: HistorialIntegrantesDocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HistorialIntegrantesDocumentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
