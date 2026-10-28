import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TiposFuentesFinanciacionService } from './tipos-fuentes-financiacion.service';

describe('TiposFuentesFinanciacionService', () => {
  let service: TiposFuentesFinanciacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TiposFuentesFinanciacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
