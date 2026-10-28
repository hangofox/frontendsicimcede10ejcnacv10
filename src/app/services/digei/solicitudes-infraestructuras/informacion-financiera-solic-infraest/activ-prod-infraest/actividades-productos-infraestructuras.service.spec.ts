import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActividadesProductosInfraestructurasService } from './actividades-productos-infraestructuras.service';

describe('ActividadesProductosInfraestructurasService', () => {
  let service: ActividadesProductosInfraestructurasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ActividadesProductosInfraestructurasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
