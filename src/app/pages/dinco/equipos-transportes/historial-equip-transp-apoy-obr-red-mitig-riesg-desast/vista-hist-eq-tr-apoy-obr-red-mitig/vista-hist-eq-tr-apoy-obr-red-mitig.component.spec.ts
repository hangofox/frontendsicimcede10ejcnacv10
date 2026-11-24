import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VistaHistEqTrApoyObrRedMitigComponent } from './vista-hist-eq-tr-apoy-obr-red-mitig.component';

describe('VistaHistEqTrApoyObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistEqTrApoyObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistEqTrApoyObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
