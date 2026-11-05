import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoGerentesProyectosSolicMttoSbComponent } from './listado-ger-proy-solic-mtto-san-bas.component';

describe('ListadoGerentesProyectosSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoGerentesProyectosSolicMttoSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoGerentesProyectosSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
