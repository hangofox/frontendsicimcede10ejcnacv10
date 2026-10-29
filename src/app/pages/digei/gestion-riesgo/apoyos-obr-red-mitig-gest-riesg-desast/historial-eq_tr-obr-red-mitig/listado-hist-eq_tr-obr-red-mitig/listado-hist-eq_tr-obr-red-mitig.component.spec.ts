import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistEqTrObrRedMitigComponent } from './listado-hist-eq_tr-obr-red-mitig.component';

describe('ListadoHistEqTrObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistEqTrObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistEqTrObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
