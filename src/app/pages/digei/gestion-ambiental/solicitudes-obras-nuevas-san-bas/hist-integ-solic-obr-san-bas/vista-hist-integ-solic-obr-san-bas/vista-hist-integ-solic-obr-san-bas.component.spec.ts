import { TestBed } from '@angular/core/testing';
import { VistaHistorialIntegranteSolicObrSbComponent } from './vista-hist-integ-solic-obr-san-bas.component';

describe('VistaHistorialIntegranteSolicObrSbComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistorialIntegranteSolicObrSbComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistorialIntegranteSolicObrSbComponent).componentInstance).toBeTruthy();
  });
});
