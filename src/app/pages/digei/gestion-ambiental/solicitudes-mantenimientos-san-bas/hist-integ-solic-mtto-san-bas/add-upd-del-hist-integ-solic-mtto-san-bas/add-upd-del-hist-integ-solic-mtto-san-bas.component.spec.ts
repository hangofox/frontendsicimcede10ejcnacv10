import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelHistorialIntegranteSolicMttoSbComponent } from './add-upd-del-hist-integ-solic-mtto-san-bas.component';

describe('AddUpdDelHistorialIntegranteSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistorialIntegranteSolicMttoSbComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistorialIntegranteSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
