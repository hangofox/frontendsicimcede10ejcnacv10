import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelHistorialIntegranteSolicConstNuevComponent } from './add-upd-del-hist-integ-solic-const-nuev.component';

describe('AddUpdDelHistorialIntegranteSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistorialIntegranteSolicConstNuevComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistorialIntegranteSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
