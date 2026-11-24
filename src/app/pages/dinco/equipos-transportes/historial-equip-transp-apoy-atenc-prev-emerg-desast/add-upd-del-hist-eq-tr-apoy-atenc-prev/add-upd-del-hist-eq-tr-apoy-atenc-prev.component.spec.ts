import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelHistEqTrApoyAtencPrevComponent } from './add-upd-del-hist-eq-tr-apoy-atenc-prev.component';

describe('AddUpdDelHistEqTrApoyAtencPrevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistEqTrApoyAtencPrevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistEqTrApoyAtencPrevComponent).componentInstance).toBeTruthy();
  });
});
