import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoSociedadesUnidadesCentralizadorasComponent } from './listado-sociedades-unidades-centralizadoras.component';

describe('ListadoSociedadesUnidadesCentralizadorasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSociedadesUnidadesCentralizadorasComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoSociedadesUnidadesCentralizadorasComponent).componentInstance).toBeTruthy();
  });
});
