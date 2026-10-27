import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VistaIntegApoyAtencPrevEmergDesastComponent } from './vista-integ-apoy-atenc-prev-emerg-desast.component';

describe('VistaIntegApoyAtencPrevEmergDesastComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaIntegApoyAtencPrevEmergDesastComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(VistaIntegApoyAtencPrevEmergDesastComponent).componentInstance).toBeTruthy();
  });
});
