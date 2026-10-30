import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoInformacionFinancieraSolicObrSbComponent } from './listado-info-fin-solic-obr-san-bas.component';

describe('ListadoInformacionFinancieraSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInformacionFinancieraSolicObrSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoInformacionFinancieraSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
