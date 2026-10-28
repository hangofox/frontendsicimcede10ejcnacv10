import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistEqTrApoyAtPrevEmDesComponent } from './listado-hist-eq_tr-apoy-at-prev-em-des.component';

describe('ListadoHistEqTrApoyAtPrevEmDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistEqTrApoyAtPrevEmDesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistEqTrApoyAtPrevEmDesComponent).componentInstance).toBeTruthy();
  });
});
