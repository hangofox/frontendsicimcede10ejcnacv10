import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaquinariasPesadasService } from './maquinarias-pesadas.service';

describe('MaquinariasPesadasService', () => {
  let service: MaquinariasPesadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(MaquinariasPesadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
