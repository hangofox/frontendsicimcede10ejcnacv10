import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoInformacionFinancieraSolicMttoComponent } from './listado-info-fin-solic-mtto.component';

describe('ListadoInformacionFinancieraSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInformacionFinancieraSolicMttoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoInformacionFinancieraSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
