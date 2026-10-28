import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FotAnexSolicMttoComponent } from './fot-anex-solic-mttos.component';

describe('FotAnexSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [FotAnexSolicMttoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(FotAnexSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
