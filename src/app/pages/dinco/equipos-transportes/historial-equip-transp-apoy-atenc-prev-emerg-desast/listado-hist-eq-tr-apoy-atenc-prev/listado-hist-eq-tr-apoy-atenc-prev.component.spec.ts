import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ListadoHistEqTrApoyAtencPrevComponent } from './listado-hist-eq-tr-apoy-atenc-prev.component';

describe('ListadoHistEqTrApoyAtencPrevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistEqTrApoyAtencPrevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistEqTrApoyAtencPrevComponent).componentInstance).toBeTruthy();
  });
});
