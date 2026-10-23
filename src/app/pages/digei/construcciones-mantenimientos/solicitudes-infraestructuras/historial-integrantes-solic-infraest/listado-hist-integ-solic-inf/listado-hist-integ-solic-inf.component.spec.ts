import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistorialIntegrantesSolicInfraestComponent } from './listado-hist-integ-solic-inf.component';

describe('ListadoHistorialIntegrantesSolicInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistorialIntegrantesSolicInfraestComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistorialIntegrantesSolicInfraestComponent).componentInstance).toBeTruthy();
  });
});
