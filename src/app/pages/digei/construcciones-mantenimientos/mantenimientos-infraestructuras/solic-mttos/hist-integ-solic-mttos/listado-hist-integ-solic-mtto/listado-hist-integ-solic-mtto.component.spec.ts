import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistorialIntegrantesSolicMttoComponent } from './listado-hist-integ-solic-mtto.component';

describe('ListadoHistorialIntegrantesSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistorialIntegrantesSolicMttoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistorialIntegrantesSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
