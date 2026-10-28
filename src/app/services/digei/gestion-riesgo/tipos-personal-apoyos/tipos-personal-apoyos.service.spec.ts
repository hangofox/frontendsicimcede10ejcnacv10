import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TiposPersonalApoyosService } from './tipos-personal-apoyos.service';

describe('TiposPersonalApoyosService', () => {
  let service: TiposPersonalApoyosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TiposPersonalApoyosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
