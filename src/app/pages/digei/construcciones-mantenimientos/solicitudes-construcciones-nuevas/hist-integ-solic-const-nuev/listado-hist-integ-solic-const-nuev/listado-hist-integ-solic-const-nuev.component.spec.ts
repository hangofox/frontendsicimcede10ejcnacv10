import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistorialIntegrantesSolicConstNuevComponent } from './listado-hist-integ-solic-const-nuev.component';

describe('ListadoHistorialIntegrantesSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistorialIntegrantesSolicConstNuevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistorialIntegrantesSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
