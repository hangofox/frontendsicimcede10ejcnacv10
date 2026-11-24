import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelHistEqTrApoyObrRedMitigComponent } from './add-upd-del-hist-eq-tr-apoy-obr-red-mitig.component';

describe('AddUpdDelHistEqTrApoyObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistEqTrApoyObrRedMitigComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistEqTrApoyObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
