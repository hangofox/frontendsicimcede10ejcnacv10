import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FotAnexApoyAtencPrevEmergDesComponent } from './fot-anex-apoy-atenc-prev-emerg-des.component';

describe('FotAnexApoyAtencPrevEmergDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [FotAnexApoyAtencPrevEmergDesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(FotAnexApoyAtencPrevEmergDesComponent).componentInstance).toBeTruthy();
  });
});
