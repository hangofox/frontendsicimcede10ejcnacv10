import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoInformacionFinancieraSolicMttoSbComponent } from './listado-info-fin-solic-mtto-san-bas.component';

describe('ListadoInformacionFinancieraSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInformacionFinancieraSolicMttoSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoInformacionFinancieraSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
