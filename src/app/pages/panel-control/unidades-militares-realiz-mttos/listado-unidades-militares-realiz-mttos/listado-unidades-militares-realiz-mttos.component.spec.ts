import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoUnidadesMilitaresRealizMttosComponent } from './listado-unidades-militares-realiz-mttos.component';

describe('ListadoUnidadesMilitaresRealizMttosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoUnidadesMilitaresRealizMttosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoUnidadesMilitaresRealizMttosComponent).componentInstance).toBeTruthy();
  });
});
