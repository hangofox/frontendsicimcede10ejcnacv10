import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoGerentesProyectosSolicMttoComponent } from './listado-ger-proy-solic-mtto.component';

describe('ListadoGerentesProyectosSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoGerentesProyectosSolicMttoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoGerentesProyectosSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
