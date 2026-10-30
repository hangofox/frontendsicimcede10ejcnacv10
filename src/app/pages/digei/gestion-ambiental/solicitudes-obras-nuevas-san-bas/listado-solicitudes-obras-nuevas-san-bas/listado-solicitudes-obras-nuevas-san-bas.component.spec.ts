import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoSolicitudesObrasNuevasSaneamientosBasicosComponent } from './listado-solicitudes-obras-nuevas-san-bas.component';

describe('ListadoSolicitudesObrasNuevasSaneamientosBasicosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSolicitudesObrasNuevasSaneamientosBasicosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSolicitudesObrasNuevasSaneamientosBasicosComponent).componentInstance).toBeTruthy();
  });
});
