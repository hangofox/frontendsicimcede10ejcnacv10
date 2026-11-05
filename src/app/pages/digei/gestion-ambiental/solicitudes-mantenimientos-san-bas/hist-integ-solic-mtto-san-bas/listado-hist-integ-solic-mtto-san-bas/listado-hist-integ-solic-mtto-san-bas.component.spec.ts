import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistorialIntegrantesSolicMttoSbComponent } from './listado-hist-integ-solic-mtto-san-bas.component';

describe('ListadoHistorialIntegrantesSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistorialIntegrantesSolicMttoSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistorialIntegrantesSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
