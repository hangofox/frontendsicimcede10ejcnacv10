import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoGerentesProyectosSolicConstNuevComponent } from './listado-ger-proy-solic-const-nuev.component';

describe('ListadoGerentesProyectosSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoGerentesProyectosSolicConstNuevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoGerentesProyectosSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
