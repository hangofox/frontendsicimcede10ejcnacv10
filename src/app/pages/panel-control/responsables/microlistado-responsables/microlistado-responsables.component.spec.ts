import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MicrolistadoResponsablesComponent } from './microlistado-responsables.component';

describe('MicrolistadoResponsablesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [MicrolistadoResponsablesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(MicrolistadoResponsablesComponent).componentInstance).toBeTruthy();
  });
});
