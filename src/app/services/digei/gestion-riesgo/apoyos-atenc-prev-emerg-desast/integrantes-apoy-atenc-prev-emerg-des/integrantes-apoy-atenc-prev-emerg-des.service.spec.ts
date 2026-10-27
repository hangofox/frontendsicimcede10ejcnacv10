import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IntegrantesApoyosAtencPrevEmergDesastService } from './integrantes-apoy-atenc-prev-emerg-des.service';

describe('IntegrantesApoyosAtencPrevEmergDesastService', () => {
  let service: IntegrantesApoyosAtencPrevEmergDesastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(IntegrantesApoyosAtencPrevEmergDesastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
