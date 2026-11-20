import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EquiposIngenierosService } from './equipos-ingenieros.service';

describe('EquiposIngenierosService', () => {
  let service: EquiposIngenierosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(EquiposIngenierosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
