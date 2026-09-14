import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DeshboardsEstadisticasComponent } from './deshboards-estadisticas.component';

describe('DeshboardsEstadisticasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [DeshboardsEstadisticasComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    expect(TestBed.createComponent(DeshboardsEstadisticasComponent).componentInstance).toBeTruthy();
  });
});
