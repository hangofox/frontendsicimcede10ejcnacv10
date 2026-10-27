import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TiposEntidadesInstitucionalesService } from './tipos-entidades-institucionales.service';

describe('TiposEntidadesInstitucionalesService', () => {
  let service: TiposEntidadesInstitucionalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TiposEntidadesInstitucionalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
