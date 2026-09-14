import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ComodatosService } from './comodatos.service';

describe('ComodatosService', () => {
  let service: ComodatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ComodatosService);
  });

  it('debe crearse', () => {
    expect(service).toBeTruthy();
  });
});
