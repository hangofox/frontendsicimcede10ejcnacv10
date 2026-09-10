import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EstadisticasTerrenosComponent } from './estadisticas-terrenos.component';

describe('EstadisticasTerrenosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasTerrenosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    expect(TestBed.createComponent(EstadisticasTerrenosComponent).componentInstance).toBeTruthy();
  });
});
