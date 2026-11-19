import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ListadoSolicitudesMantenimientosAvaladosComponent } from './listado-solicitudes-mantenimientos-avalados.component';

describe('ListadoSolicitudesMantenimientosAvaladosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSolicitudesMantenimientosAvaladosComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSolicitudesMantenimientosAvaladosComponent).componentInstance).toBeTruthy();
  });
});
