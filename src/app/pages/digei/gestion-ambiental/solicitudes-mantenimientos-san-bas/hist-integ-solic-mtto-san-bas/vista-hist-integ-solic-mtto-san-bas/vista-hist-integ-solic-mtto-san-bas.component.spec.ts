import { TestBed } from '@angular/core/testing';
import { VistaHistorialIntegranteSolicMttoSbComponent } from './vista-hist-integ-solic-mtto-san-bas.component';

describe('VistaHistorialIntegranteSolicMttoSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistorialIntegranteSolicMttoSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistorialIntegranteSolicMttoSbComponent).componentInstance).toBeTruthy();
  });
});
