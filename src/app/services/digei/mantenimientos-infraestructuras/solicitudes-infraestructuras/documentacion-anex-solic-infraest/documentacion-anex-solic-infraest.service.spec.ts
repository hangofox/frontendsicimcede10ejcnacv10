import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DocumentacionAnexaSolicInfraestService } from './documentacion-anex-solic-infraest.service';

describe('DocumentacionAnexaSolicInfraestService', () => {
  let service: DocumentacionAnexaSolicInfraestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(DocumentacionAnexaSolicInfraestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
