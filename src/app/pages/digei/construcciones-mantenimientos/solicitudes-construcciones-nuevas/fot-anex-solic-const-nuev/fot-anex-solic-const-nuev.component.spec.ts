import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FotAnexSolicConstNuevComponent } from './fot-anex-solic-const-nuev.component';

describe('FotAnexSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [FotAnexSolicConstNuevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(FotAnexSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
