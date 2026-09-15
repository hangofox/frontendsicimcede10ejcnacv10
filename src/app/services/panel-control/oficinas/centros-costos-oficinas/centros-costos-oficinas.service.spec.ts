import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CentrosCostosOficinasService } from './centros-costos-oficinas.service';

describe('CentrosCostosOficinasService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(CentrosCostosOficinasService)).toBeTruthy();
  });
});
