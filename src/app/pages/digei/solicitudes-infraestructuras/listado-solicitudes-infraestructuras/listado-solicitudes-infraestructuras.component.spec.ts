import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoSolicitudesInfraestructurasComponent } from './listado-solicitudes-infraestructuras.component';

describe('ListadoSolicitudesInfraestructurasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSolicitudesInfraestructurasComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSolicitudesInfraestructurasComponent).componentInstance).toBeTruthy();
  });
});
