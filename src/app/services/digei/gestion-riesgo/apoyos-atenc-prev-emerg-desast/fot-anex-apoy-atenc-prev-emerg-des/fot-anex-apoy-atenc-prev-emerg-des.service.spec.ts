import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FotografiasAnexasApoyAtencPrevEmergDesastService } from './fot-anex-apoy-atenc-prev-emerg-des.service';

describe('FotografiasAnexasApoyAtencPrevEmergDesastService', () => {
  let service: FotografiasAnexasApoyAtencPrevEmergDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FotografiasAnexasApoyAtencPrevEmergDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
