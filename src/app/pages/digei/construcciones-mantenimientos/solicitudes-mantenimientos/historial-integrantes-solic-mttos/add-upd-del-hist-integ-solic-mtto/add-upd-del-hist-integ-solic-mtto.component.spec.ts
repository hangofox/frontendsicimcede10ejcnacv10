import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelHistorialIntegranteSolicMttoComponent } from './add-upd-del-hist-integ-solic-mtto.component';

describe('AddUpdDelHistorialIntegranteSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistorialIntegranteSolicMttoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistorialIntegranteSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
