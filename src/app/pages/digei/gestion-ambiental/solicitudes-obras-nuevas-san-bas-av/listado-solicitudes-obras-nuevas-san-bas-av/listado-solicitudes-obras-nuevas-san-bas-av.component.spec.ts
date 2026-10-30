import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ListadoSolicitudesObrasNuevasSaneamientosBasicosAvaladosComponent } from './listado-solicitudes-obras-nuevas-san-bas-av.component';

describe('ListadoSolicitudesObrasNuevasSaneamientosBasicosAvaladosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSolicitudesObrasNuevasSaneamientosBasicosAvaladosComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSolicitudesObrasNuevasSaneamientosBasicosAvaladosComponent).componentInstance).toBeTruthy();
  });
});
