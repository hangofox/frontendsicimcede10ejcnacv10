import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CentrosCostosUnidadesMilitaresService } from './centros-costos-unidades-militares.service';

describe('CentrosCostosUnidadesMilitaresService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(CentrosCostosUnidadesMilitaresService)).toBeTruthy();
  });
});
