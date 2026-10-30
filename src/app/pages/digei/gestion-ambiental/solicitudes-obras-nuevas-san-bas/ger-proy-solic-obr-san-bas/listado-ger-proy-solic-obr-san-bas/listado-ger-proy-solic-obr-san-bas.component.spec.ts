import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoGerentesProyectosSolicObrSbComponent } from './listado-ger-proy-solic-obr-san-bas.component';

describe('ListadoGerentesProyectosSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoGerentesProyectosSolicObrSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoGerentesProyectosSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
