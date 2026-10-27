import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelIntegApoyAtencPrevEmergDesastComponent } from './add-upd-del-integ_apoy-atenc-prev-emerg-desast.component';

describe('AddUpdDelIntegApoyAtencPrevEmergDesastComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelIntegApoyAtencPrevEmergDesastComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelIntegApoyAtencPrevEmergDesastComponent).componentInstance).toBeTruthy();
  });
});
