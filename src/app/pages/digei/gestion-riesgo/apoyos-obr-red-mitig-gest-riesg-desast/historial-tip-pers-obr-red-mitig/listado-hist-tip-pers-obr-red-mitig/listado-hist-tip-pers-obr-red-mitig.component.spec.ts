import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistTipPersObrRedMitigComponent } from './listado-hist-tip-pers-obr-red-mitig.component';

describe('ListadoHistTipPersObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistTipPersObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistTipPersObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
