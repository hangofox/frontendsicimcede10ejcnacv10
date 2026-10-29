import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoIntegApoyObrRedMitigComponent } from './listado-integ-apoy-obr-red-mitig.component';

describe('ListadoIntegApoyObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoIntegApoyObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoIntegApoyObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
