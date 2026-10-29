import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelIntegApoyObrRedMitigComponent } from './add-upd-del-integ_apoy-obr-red-mitig.component';

describe('AddUpdDelIntegApoyObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelIntegApoyObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelIntegApoyObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
