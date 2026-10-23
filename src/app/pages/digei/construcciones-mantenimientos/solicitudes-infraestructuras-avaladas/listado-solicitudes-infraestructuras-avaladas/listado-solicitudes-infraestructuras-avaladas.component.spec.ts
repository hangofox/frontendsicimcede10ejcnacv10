import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ListadoSolicitudesInfraestructurasAvaladasComponent } from './listado-solicitudes-infraestructuras-avaladas.component';

describe('ListadoSolicitudesInfraestructurasAvaladasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSolicitudesInfraestructurasAvaladasComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSolicitudesInfraestructurasAvaladasComponent).componentInstance).toBeTruthy();
  });
});
