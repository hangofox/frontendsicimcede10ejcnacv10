import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CuentasEquiposIngenierosService } from './cuentas-equipos-ingenieros.service';

describe('CuentasEquiposIngenierosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    expect(TestBed.inject(CuentasEquiposIngenierosService)).toBeTruthy();
  });
});
