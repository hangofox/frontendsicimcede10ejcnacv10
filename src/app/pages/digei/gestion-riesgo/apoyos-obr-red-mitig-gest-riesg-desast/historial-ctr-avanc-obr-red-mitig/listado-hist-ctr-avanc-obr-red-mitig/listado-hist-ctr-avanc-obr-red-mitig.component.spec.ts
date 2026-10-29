import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistCtrAvancObrRedMitigComponent } from './listado-hist-ctr-avanc-obr-red-mitig.component';

describe('ListadoHistCtrAvancObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistCtrAvancObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistCtrAvancObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
