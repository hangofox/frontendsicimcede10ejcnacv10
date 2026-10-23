import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoLineasMandosUnidadesMilitaresComponent } from './listado-lineas-mandos-unidades-militares.component';

describe('ListadoLineasMandosUnidadesMilitaresComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoLineasMandosUnidadesMilitaresComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoLineasMandosUnidadesMilitaresComponent).componentInstance).toBeTruthy();
  });
});
