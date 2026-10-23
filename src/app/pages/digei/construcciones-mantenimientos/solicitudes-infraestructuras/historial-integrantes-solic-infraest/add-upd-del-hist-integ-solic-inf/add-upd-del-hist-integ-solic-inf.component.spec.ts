import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelHistorialIntegranteSolicInfraestComponent } from './add-upd-del-hist-integ-solic-inf.component';

describe('AddUpdDelHistorialIntegranteSolicInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistorialIntegranteSolicInfraestComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistorialIntegranteSolicInfraestComponent).componentInstance).toBeTruthy();
  });
});
