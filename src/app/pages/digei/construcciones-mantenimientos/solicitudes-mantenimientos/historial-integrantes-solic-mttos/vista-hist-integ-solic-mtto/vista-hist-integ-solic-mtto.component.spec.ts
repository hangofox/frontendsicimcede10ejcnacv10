import { TestBed } from '@angular/core/testing';
import { VistaHistorialIntegranteSolicMttoComponent } from './vista-hist-integ-solic-mtto.component';

describe('VistaHistorialIntegranteSolicMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistorialIntegranteSolicMttoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistorialIntegranteSolicMttoComponent).componentInstance).toBeTruthy();
  });
});
