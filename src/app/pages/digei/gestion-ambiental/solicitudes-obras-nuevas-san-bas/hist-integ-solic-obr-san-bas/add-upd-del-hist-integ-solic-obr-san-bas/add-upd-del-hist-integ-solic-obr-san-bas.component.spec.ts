import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelHistorialIntegranteSolicObrSbComponent } from './add-upd-del-hist-integ-solic-obr-san-bas.component';

describe('AddUpdDelHistorialIntegranteSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistorialIntegranteSolicObrSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistorialIntegranteSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
