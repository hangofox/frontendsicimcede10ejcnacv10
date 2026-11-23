import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { GerentesProyectosSolicInfraestService } from './gerentes-proyectos-solic-infraest.service';

describe('GerentesProyectosSolicInfraestService', () => {
  let service: GerentesProyectosSolicInfraestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(GerentesProyectosSolicInfraestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
