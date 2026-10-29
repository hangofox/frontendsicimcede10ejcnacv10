import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FotAnexApoyObrRedMitigGestDesComponent } from './fot-anex-apoy-obr-red-mitig-gest-des.component';

describe('FotAnexApoyObrRedMitigGestDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [FotAnexApoyObrRedMitigGestDesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(FotAnexApoyObrRedMitigGestDesComponent).componentInstance).toBeTruthy();
  });
});
