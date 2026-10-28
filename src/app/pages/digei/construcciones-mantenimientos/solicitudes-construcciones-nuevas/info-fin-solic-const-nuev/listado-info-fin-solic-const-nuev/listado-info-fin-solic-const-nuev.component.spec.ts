import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoInformacionFinancieraSolicConstNuevComponent } from './listado-info-fin-solic-const-nuev.component';

describe('ListadoInformacionFinancieraSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInformacionFinancieraSolicConstNuevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoInformacionFinancieraSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
