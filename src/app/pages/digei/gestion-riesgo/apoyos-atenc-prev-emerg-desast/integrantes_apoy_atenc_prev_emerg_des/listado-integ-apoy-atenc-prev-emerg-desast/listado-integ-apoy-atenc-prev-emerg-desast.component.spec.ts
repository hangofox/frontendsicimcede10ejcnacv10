import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoIntegApoyAtencPrevEmergDesastComponent } from './listado-integ-apoy-atenc-prev-emerg-desast.component';

describe('ListadoIntegApoyAtencPrevEmergDesastComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoIntegApoyAtencPrevEmergDesastComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoIntegApoyAtencPrevEmergDesastComponent).componentInstance).toBeTruthy();
  });
});
