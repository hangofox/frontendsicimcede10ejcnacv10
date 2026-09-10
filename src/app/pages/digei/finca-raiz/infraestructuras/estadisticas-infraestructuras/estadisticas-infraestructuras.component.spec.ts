import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EstadisticasInfraestructurasComponent } from './estadisticas-infraestructuras.component';

describe('EstadisticasInfraestructurasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasInfraestructurasComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    expect(TestBed.createComponent(EstadisticasInfraestructurasComponent).componentInstance).toBeTruthy();
  });
});
