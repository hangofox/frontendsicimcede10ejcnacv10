import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FotogAnexApoyAtencPrevEmergDesComponent } from './fotog_anex_apoy_atenc_prev_emerg_des.component';

describe('FotogAnexApoyAtencPrevEmergDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [FotogAnexApoyAtencPrevEmergDesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(FotogAnexApoyAtencPrevEmergDesComponent).componentInstance).toBeTruthy();
  });
});
