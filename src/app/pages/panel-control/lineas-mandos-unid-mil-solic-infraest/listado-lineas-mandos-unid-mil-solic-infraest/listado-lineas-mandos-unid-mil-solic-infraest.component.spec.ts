import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoLineasMandosUnidMilSolicInfraestComponent } from './listado-lineas-mandos-unid-mil-solic-infraest.component';

describe('ListadoLineasMandosUnidMilSolicInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoLineasMandosUnidMilSolicInfraestComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoLineasMandosUnidMilSolicInfraestComponent).componentInstance).toBeTruthy();
  });
});
