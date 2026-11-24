import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VistaHistEqTrApoyAtencPrevComponent } from './vista-hist-eq-tr-apoy-atenc-prev.component';

describe('VistaHistEqTrApoyAtencPrevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistEqTrApoyAtencPrevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistEqTrApoyAtencPrevComponent).componentInstance).toBeTruthy();
  });
});
