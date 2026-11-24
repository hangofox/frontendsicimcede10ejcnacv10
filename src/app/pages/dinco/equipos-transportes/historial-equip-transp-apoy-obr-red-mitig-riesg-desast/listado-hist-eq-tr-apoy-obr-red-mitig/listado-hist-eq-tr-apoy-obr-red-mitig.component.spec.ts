import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ListadoHistEqTrApoyObrRedMitigComponent } from './listado-hist-eq-tr-apoy-obr-red-mitig.component';

describe('ListadoHistEqTrApoyObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistEqTrApoyObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistEqTrApoyObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
