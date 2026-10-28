import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ListadoSolicitudesConstruccionesNuevasAvaladasComponent } from './listado-solic-const-nuev-avaladas.component';

describe('ListadoSolicitudesConstruccionesNuevasAvaladasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSolicitudesConstruccionesNuevasAvaladasComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSolicitudesConstruccionesNuevasAvaladasComponent).componentInstance).toBeTruthy();
  });
});
