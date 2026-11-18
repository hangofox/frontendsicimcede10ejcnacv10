import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PelotonesUnidadesMilitaresService } from './pelotones-unidades-militares.service';

describe('PelotonesUnidadesMilitaresService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(PelotonesUnidadesMilitaresService)).toBeTruthy();
  });
});
