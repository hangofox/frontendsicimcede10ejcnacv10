import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoSolicitudesConstruccionesNuevasComponent } from './listado-solicitudes-construcciones-nuevas.component';

describe('ListadoSolicitudesConstruccionesNuevasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSolicitudesConstruccionesNuevasComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSolicitudesConstruccionesNuevasComponent).componentInstance).toBeTruthy();
  });
});
