import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TiposDocumentosAnexosSolicInfraestService } from './tipos-documentacion-anex-solic-infraest.service';

describe('TiposDocumentosAnexosSolicInfraestService', () => {
  let service: TiposDocumentosAnexosSolicInfraestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TiposDocumentosAnexosSolicInfraestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
