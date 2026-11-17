import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistorialMantenimientosInfraestComponent } from './listado-hist-mttos-infraest.component';

describe('ListadoHistorialMantenimientosInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistorialMantenimientosInfraestComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistorialMantenimientosInfraestComponent).componentInstance).toBeTruthy();
  });
});
