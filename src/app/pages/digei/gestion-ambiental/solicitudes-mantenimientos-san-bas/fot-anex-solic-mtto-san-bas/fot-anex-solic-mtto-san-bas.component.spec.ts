import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FotAnexSolicMttoSbComponent } from './fot-anex-solic-mtto-san-bas.component';

describe('FotAnexSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [FotAnexSolicMttoSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(FotAnexSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
