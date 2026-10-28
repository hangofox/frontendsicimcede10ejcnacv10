import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoSolicitudesMantenimientosComponent } from './listado-solicitudes-mantenimientos.component';

describe('ListadoSolicitudesMantenimientosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSolicitudesMantenimientosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSolicitudesMantenimientosComponent).componentInstance).toBeTruthy();
  });
});
