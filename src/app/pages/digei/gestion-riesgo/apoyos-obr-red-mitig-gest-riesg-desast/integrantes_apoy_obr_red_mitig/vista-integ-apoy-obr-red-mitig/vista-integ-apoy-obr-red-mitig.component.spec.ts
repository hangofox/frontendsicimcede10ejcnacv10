import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VistaIntegApoyObrRedMitigComponent } from './vista-integ-apoy-obr-red-mitig.component';

describe('VistaIntegApoyObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaIntegApoyObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(VistaIntegApoyObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
