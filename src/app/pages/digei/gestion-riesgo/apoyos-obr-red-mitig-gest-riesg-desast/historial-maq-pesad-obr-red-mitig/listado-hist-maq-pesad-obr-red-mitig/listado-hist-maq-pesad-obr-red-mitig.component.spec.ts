import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistMaqPesadObrRedMitigComponent } from './listado-hist-maq-pesad-obr-red-mitig.component';

describe('ListadoHistMaqPesadObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistMaqPesadObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistMaqPesadObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
