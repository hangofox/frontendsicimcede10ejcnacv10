import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CapitulosInfraestructurasService } from './capitulos-infraestructuras.service';

describe('CapitulosInfraestructurasService', () => {
  let service: CapitulosInfraestructurasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CapitulosInfraestructurasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
