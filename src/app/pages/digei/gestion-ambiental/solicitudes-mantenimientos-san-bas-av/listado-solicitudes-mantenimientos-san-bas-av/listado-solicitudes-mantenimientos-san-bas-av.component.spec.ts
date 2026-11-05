import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ListadoSolicitudesMantenimientosSaneamientosBasicosAvaladosComponent } from './listado-solicitudes-mantenimientos-san-bas-av.component';

describe('ListadoSolicitudesMantenimientosSaneamientosBasicosAvaladosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSolicitudesMantenimientosSaneamientosBasicosAvaladosComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSolicitudesMantenimientosSaneamientosBasicosAvaladosComponent).componentInstance).toBeTruthy();
  });
});
